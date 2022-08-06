import { Context } from "../../../../pages/_app";
import { useContext, useEffect } from "react";
import { FC } from "react";
import { useState } from "react";
import styles from "./auth.module.scss";
import {observer} from 'mobx-react-lite'
import { useRouter } from "next/router";
import Push from "@/components/ui/Push/Push";
import { useForm } from "react-hook-form";
import { IResponseLogin } from "@/types/interfaces";

const Auth: FC = () => {
  const [error, setError] = useState<string>('')
  const { store } = useContext(Context);
  const router = useRouter()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])

  if (store.isAuth) {
    return(
      <Push href="/profile" />
    )
  }

  const Login = async ({ email, password }: IResponseLogin): Promise<void> => {
    const login = await store.login(email, password)
    if (login === undefined){
      router.push('/profile')
    }
    if (login !== undefined){
      switch (login){
        case 'Пароль введён неверно':
          setError(login);
          setTimeout(() => setError(''), 2500);
          break;
        case 'Пользователь ещё не зарегистрирован':
          setError(login);
          setTimeout(() => setError(''), 2500);
          break;
      }
    }
  }
  

  return (
    <section className={styles["auth"]}>
      <div className={styles["auth-container"]}>
        <div className={styles["auth__inner"]}>
          <form onSubmit={handleSubmit(Login)} className={styles["auth__form"]}>
            <svg
              fill="none"
              height="48"
              className={styles["auth__logo"]}
              viewBox="0 0 49 48"
              width="49"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M3.87 3.37C.5 6.75.5 12.17.5 23.04v1.92c0 10.86 0 16.3 3.37 19.67C7.25 48 12.67 48 23.54 48h1.92c10.86 0 16.3 0 19.67-3.37 3.37-3.38 3.37-8.8 3.37-19.67v-1.92c0-10.86 0-16.3-3.37-19.67C41.75 0 36.33 0 25.46 0h-1.92C12.68 0 7.24 0 3.87 3.37zm4.74 11.3c.25 12.48 6.82 20 17.65 20h.63v-7.15c3.95.4 6.89 3.35 8.09 7.15h5.69a15.8 15.8 0 0 0-8.03-10.03c2.48-1.49 6-5.09 6.83-9.97h-5.18c-1.08 3.97-4.31 7.57-7.4 7.91v-7.91h-5.26v13.85c-3.2-.8-7.37-4.68-7.54-13.85z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            <h1 className={styles["auth__form-title"]}>Вход ВКонтакте</h1>
            <input
              className={styles["auth__form-input"]}
              type="text"
              placeholder="Электронная почта"
              {...register("email", {
                required: "Поле обязательно к заполнению!",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Электронный адрес введён некорректно",
                },
              })}
            />
            {errors?.email && (
              <p className="form-err-text">{`${errors?.email?.message}`}</p>
            )}
            {error === 'Пользователь ещё не зарегистрирован' && (
                  <p className="form-err-text">{error}</p>
              )
            }
            <input
              className={styles["auth__form-input"]}
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: "Поле обязательно к заполнению!"
              })}
            />
            {errors?.password && (
              <p className="form-err-text">{`${errors?.password?.message}`}</p>
            )}
            {error === 'Пароль введён неверно' && (
              <p className="form-err-text">{error}</p>
            )}
            <button
              className={styles["auth__form-btn"]}
              type="submit"
              disabled={!isValid}
            >
              Войти
            </button>
            <div className={styles["auth__form-footer"]}>
              <span>Нет учетной записи?</span>
              <a href="/registration" className={styles["auth__form-registr"]}>
                Зарегистрироваться
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default observer(Auth);
