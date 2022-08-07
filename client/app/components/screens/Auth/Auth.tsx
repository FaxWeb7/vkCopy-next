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
import { APP_URL } from "@/constants/constants";

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
            <img src={`${APP_URL}/common/logo-white.svg`} alt="logo" className={styles['auth__logo']} />
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
