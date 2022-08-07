import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import styles from "./registration.module.scss";
import { Context } from "../../../../pages/_app";
import { useForm } from "react-hook-form";
import { IResponseRegistration } from "@/types/interfaces";
import {observer} from 'mobx-react-lite'
import Push from "@/components/ui/Push/Push";
import { APP_URL } from "@/constants/constants";

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
            <img src={`${APP_URL}/common/logo-white.svg`} alt="logo" className={styles['auth__logo']} />
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
