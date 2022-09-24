import Loading from '@/components/ui/Loading/Loading';
import { IPost, IUser } from '@/types/interfaces';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { Context } from '../../../../pages/_app';
import Post from '../Profile/Post/Post';
import styles from './user.module.scss'

const User: FC<{user: IUser}> = ({ user }) => {
  const {store} = useContext(Context)
  const router = useRouter()

  const addFriend = async (): Promise<void> => {
    const response = await store.addFriend(store.user.id, router.query.id)
    console.log(store.user, store.secondUser)
  }

  return (
    <>
      {user.avatarPath ? (
        <section className={styles.profile}>
          <div className={styles.inner}>
            <div className={styles.about}>
              <div className={styles['about-avatar']}>
                <img className={styles['avatar-img']} src={user.avatarPath} alt="avatar" />
                <div className={styles['input-wrapper']}>
                  <button className={styles['avatar-btn']} onClick={() => addFriend()}>Добавить в друзья</button>
                  <button className={styles['avatar-btn']}>Написать сообщение</button>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles['content-about']}>
                <h1 className={styles['content-about-name']}>{user.firstName} {user.lastName}</h1>
                <div className="line"></div>
                <div className={styles['content-about-info']}>
                  <h2 className={styles['content-about-info-item']}>50<span> Друзей</span></h2>
                  <div className="line-up"></div>
                  <h2 className={styles['content-about-info-item']}>{user.posts.length}<span> Постов</span></h2>
                </div>
              </div>
              <h2 className={styles['posts-title']}>Все посты</h2>
              <div className={styles['posts-list']}>
                {user?.posts.map(({ text, image, likes, comments, date, _id }: IPost) => (
                  <Post key={_id} _id={_id} text={text} image={image} likes={likes} comments={comments} date={date} />
                ))}
              </div>
            </div>
          </div>
      </section>
      ) : <Loading />}
    </>
  )
}

export default User;