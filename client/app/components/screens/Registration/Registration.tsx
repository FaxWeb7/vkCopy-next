import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import styles from "./registration.module.scss";
import { Context } from "../../../../pages/_app";
import { useForm } from "react-hook-form";
import { IResponseRegistration } from "@/types/interfaces";
import {observer} from 'mobx-react-lite'
import Push from "@/components/ui/Push/Push";

const Registration: FC = () => {
  const [error, setError] = useState<string>('')
  const { store } = useContext(Context);
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])

  const RegistrationSubmit = async ({ email, password, firstName, lastName }: IResponseRegistration): Promise<void> => {
    const registration = await store.registration(email, password, firstName, lastName)
    console.log(registration)
    if (registration === undefined){
      router.push('/profile')
    }
    if (registration !== undefined){
      switch (registration){
        case 'Пользователь уже существует!':
          setError(registration)
          setTimeout(() => setError(''), 2500)
          break
      }
    }
  }

  if (store.isAuth) {
    return(
      <Push href="/profile" />
    )
  }

  return (
    <section className={styles["auth"]}>
      <div className={styles["auth-container"]}>
        <div className={styles["auth__inner"]}>
          <form onSubmit={handleSubmit(RegistrationSubmit)} className={styles["auth__form"]}>
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
            <h1 className={styles["auth__form-title"]}>
              Регистрация ВКонтакте
            </h1>
            <input
              className={styles["auth__form-input"]}
              type="text"
              placeholder="Имя"
              {...register("firstName", {
                required: "Поле обязательно к заполнению!",
              })}
            />
            {errors?.firstName && (
              <p className="form-err-text">{`${errors?.firstName?.message}`}</p>
            )}
            <input
              className={styles["auth__form-input"]}
              type="text"
              placeholder="Фамилия"
              {...register("lastName", {
                required: "Поле обязательно к заполнению!",
              })}
            />
            {errors?.lastName && (
              <p className="form-err-text">{`${errors?.lastName?.message}`}</p>
            )}
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
            {error === 'Пользователь уже существует!' && (
              <p className="form-err-text">{error}</p>
            )}
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
            <button
              className={styles["auth__form-btn"]}
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
            <div className={styles["auth__form-footer"]}>
              <span>Уже есть учетная запись?</span>
              <a href="/authorization" className={styles["auth__form-registr"]}>
                Войти
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default observer(Registration);
