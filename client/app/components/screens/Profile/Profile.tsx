import Push from "@/components/ui/Push/Push";
import { APP_URL } from "@/constants/constants";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Context } from "../../../../pages/_app";
import Post from "./Post/Post";
import PostForm from "./PostForm/PostForm";
import { Posts } from "./Posts";
import styles from './profile.module.scss'
import { Users } from "./Users";

const Profile = () => {
  const { store } = useContext(Context);
  const [isMore, setIsMore] = useState<boolean>(false)
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
        <div className={styles.inner}>
          <div className={styles.about}>
            <div className={styles['about-avatar']}>
              <img className={styles['avatar-img']} src={`${APP_URL}/avatars/defaultAvatar.jpg`} alt="avatar" />
              <button className={styles['avatar-btn']}>Изменить аватарку</button>
            </div>
            <div className={styles['about-users']}>
              <h2 className={styles['users-title']}>Другие пользователи</h2>
              <ul className={styles['users-list']}>
                {Users.map(({ link, avatarPath, firstName }, value): any => {
                    if (value <= 14 || isMore) {
                      return (
                        <a href={link} key={value} className={styles['users-item']}>
                          <img src={avatarPath} className={styles['item-img']} alt="" />
                          <h2 className={styles['item-name']}>{firstName}</h2>
                        </a>
                      )
                    }
                    })}
              </ul>
              <h2 className={styles['users-more']} onClick={() => setIsMore(!isMore)}>{!isMore ? 'Показать больше' : 'Показать меньше'}</h2>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles['content-about']}>
              <h1 className={styles['content-about-name']}>Артем Павловский</h1>
              <div className="line"></div>
              <div className={styles['content-about-info']}>
                <h2 className={styles['content-about-info-item']}>50<span> Друзей</span></h2>
                <div className="line-up"></div>
                <h2 className={styles['content-about-info-item']}>20<span> Постов</span></h2>
              </div>
            </div>
            <PostForm />
            <h2 className={styles['posts-title']}>Все посты</h2>
            <div className={styles['posts-list']}>
              {Posts.map(({ link, avatarPath, firstName, lastName, time, text, image }, value): any => (
                <Post link={link} avatarPath={avatarPath} firstName={firstName} lastName={lastName} time={time} text={text} image={image}/>
              ))}
            </div>
          </div>
        </div>
    </section>
  )
}

export default Profile;