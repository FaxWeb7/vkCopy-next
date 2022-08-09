import Push from "@/components/ui/Push/Push";
import { APP_URL } from "@/constants/constants";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../../../../pages/_app";
import styles from './profile.module.scss'
import { Users } from "./Users";

const Profile = () => {
  const { store } = useContext(Context);
  const router = useRouter()

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     store.checkAuth()
  //   }
  // }, [])

  // if (!store.isAuth) {
  //   return(
  //     <Push href="/authorization" />
  //   )
  // }

  return (
    <section className={styles.profile}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.about}>
            <div className={styles['about-avatar']}>
              <img className={styles['avatar-img']} src={`${APP_URL}/avatars/defaultAvatar.jpg`} alt="avatar" />
              <button className={styles['avatar-btn']}>Изменить аватарку</button>
            </div>
            <div className={styles['about-users']}>
              <h2 className={styles['users-title']}>Пользователи</h2>
              <ul className={styles['users-list']}>
                {Users.map(({ link, avatarPath, firstName }, value): any => (
                  <a href={link} key={value} className={styles['users-item']}>
                    <img src={avatarPath} className={styles['item-img']} alt="" />
                    <h2 className={styles['item-name']}>{firstName}</h2>
                  </a>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.content}></div>
        </div>
      </div>
    </section>
  )
}

export default Profile;