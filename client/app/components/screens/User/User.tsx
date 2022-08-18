import Push from '@/components/ui/Push/Push';
import { IPost, IUser } from '@/types/interfaces';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../pages/_app';
import Post from '../Profile/Post/Post';
import styles from './user.module.scss'

const User: FC = () => {
  const {store} = useContext(Context)
  const router = useRouter()
  const [secondUser, setSecondUser] = useState<IUser>({} as IUser)
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])
  if (router.query.id !== undefined) {
    store.getSecondUser(router.query.id)
    setSecondUser(store.secondUser)
  }

  return (
    <>
      <h1>asd</h1>
      <h1>{}</h1>
    </>
    // <section className={styles.profile}>
    //     <div className={styles.inner}>
    //       <div className={styles.about}>
    //         <div className={styles['about-avatar']}>
    //           <img className={styles['avatar-img']} src={store.user.avatarPath} alt="avatar" />
    //           <div className={styles['input-wrapper']}>
    //             <button className={styles['avatar-btn']}>Добавить в друзья</button>
    //             <button className={styles['avatar-btn']}>Написать сообщение</button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={styles.content}>
    //         <div className={styles['content-about']}>
    //           <h1 className={styles['content-about-name']}>{store.user.firstName} {store.user.lastName}</h1>
    //           <div className="line"></div>
    //           <div className={styles['content-about-info']}>
    //             <h2 className={styles['content-about-info-item']}>50<span> Друзей</span></h2>
    //             <div className="line-up"></div>
    //             <h2 className={styles['content-about-info-item']}>{store.user.posts.length}<span> Постов</span></h2>
    //           </div>
    //         </div>
    //         <h2 className={styles['posts-title']}>Все посты</h2>
    //         <div className={styles['posts-list']}>
    //           {store.user?.posts.map(({ text, image, likes, comments, date, _id }: IPost) => (
    //             <Post key={_id} _id={_id} text={text} image={image} likes={likes} comments={comments} date={date} />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    // </section>
  )
}

export default User;