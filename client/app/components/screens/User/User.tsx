import Loading from '@/components/ui/Loading/Loading';
import { IPost, IUser } from '@/types/interfaces';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { Context } from '../../../../pages/_app';
import Post from '../Profile/Post/Post';
import styles from './user.module.scss'

const User: FC<{user: IUser}> = ({ user }) => {
  const {store} = useContext(Context)
  const [isFriend, setIsFriend] = useState<boolean>(false)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const router = useRouter()

  const addFriend = async (): Promise<void> => {
    await store.addFriend(store.user.id, router.query.id)
    setIsFriend(true)
  }

  const deleteFriend = async (): Promise<void> => {
    await store.deleteFriend(store.user.id, router.query.id)
    setIsFriend(false)
  }

  if (router.query.id !== undefined ) {
    (async (): Promise<void> => {
      await store.checkAuth()
      await store.user.friends.map(({friendId, _id}) => {
        if (friendId == router.query.id) {
          setIsFriend(true)
        }
      })
      setIsAuth(true)
    })()
  }

  return (
    <>
      {!isAuth ? (
        <h1>Загрузка...</h1>
      ) : 
        <section className={styles.profile}>
          <div className={styles.inner}>
            <div className={styles.about}>
              <div className={styles['about-avatar']}>
                <img className={styles['avatar-img']} src={user.avatarPath} alt="avatar" />
                <div className={styles['input-wrapper']}>
                  {!isFriend ? (
                    <button className={styles['avatar-btn']} onClick={() => addFriend()}>Добавить в друзья</button>
                    ) : (
                    <button className={styles['avatar-btn']} onClick={() => deleteFriend()}>Удалить из друзей</button>
                  )}
                  <button className={styles['avatar-btn']}>Написать сообщение</button>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles['content-about']}>
                <h1 className={styles['content-about-name']}>{user.firstName} {user.lastName}</h1>
                <div className="line"></div>
                <div className={styles['content-about-info']}>
                  <h2 className={styles['content-about-info-item']}>{user.friends.length}<span> Друзей</span></h2>
                  <div className="line-up"></div>
                  <h2 className={styles['content-about-info-item']}>{user.posts.length}<span> Постов</span></h2>
                </div>
              </div>
              <h2 className={styles['posts-title']}>Все посты</h2>
              <div className={styles['posts-list']}>
                {user.posts.map(({ text, image, likes, comments, date, _id }: IPost) => (
                  <Post key={_id} _id={_id} text={text} image={image} likes={likes} comments={comments} date={date} />
                ))}
              </div>
            </div>
          </div>
      </section> }
    </>
  )
}

export default User;