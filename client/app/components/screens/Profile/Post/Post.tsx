import { APP_URL } from '@/constants/constants';
import { FC, useContext, useState } from 'react';
import styles from './post.module.scss'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { FaRegCommentAlt } from 'react-icons/fa'
import { Context } from '../../../../../pages/_app';
import { IPost } from '@/types/interfaces';
import { useRouter } from 'next/router';

const Post: FC<IPost> = ({ text, image, likes, comments, date, _id }) => {
  const [isLikeActive, setIsLikeActive] = useState<boolean>(false)
  const [isMore, setIsMore] = useState<boolean>(false)
  const {store} = useContext(Context)
  const router = useRouter()

  const changeLikes = async (): Promise<void> => {
    const userId = store.user.id
    if (!isLikeActive){
      setIsLikeActive(true)
      await store.addLike(userId, _id)
      await router.push(`/profile/${store.user.id}`)
    }
    if (isLikeActive){
      setIsLikeActive(false)
      await store.deleteLike(userId, _id)
      await router.push(`/profile/${store.user.id}`)
    }
  }

  const deletePost = async (): Promise<void> => {
    await store.deletePost(store.user.id, _id)
    router.push(`/profile/${store.user.id}`)
  }

  return (
    <div className={styles.post}>
      <div className={styles['post-info']}>
        <img src={store.user.avatarPath || `${APP_URL}/common/defaultAvatar.jpg`} alt="" className={styles['post-avatar']} />
        <div className={styles['post-info-content']}>
          <h2 className={styles['post-name']}>{store.user.firstName} {store.user.lastName}</h2>
          <h2 className={styles['post-time']}>{date}</h2>
        </div>
        <button className={styles['post-more']} onClick={() => setIsMore(!isMore)}><MdOutlineMoreHoriz /></button>
      </div>
      {isMore && (
        <div className={isMore ? `${styles['post-change']} ${styles['active']}` : styles['post-change']} onClick={() => deletePost()}>
          <h2 className={styles['change-item']}>Удалить пост</h2>
        </div>
      )}
      <div className={styles['post-content']}>
        <p className={styles['post-text']}>{text}</p>
        {image !== '' && <img src={image || `${APP_URL}/common/defaultAvatar.jpg`} className={styles['post-image']} />}
      </div>
      <div className={styles['post-options']}>
        <div className={styles['post-likes']} onClick={() => changeLikes()}>
          <svg className={isLikeActive ? `${styles['likes-img']} ${styles.active}` : `${styles['likes-img']}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
          <h2 className={styles['likes-num']}>{likes}</h2>
        </div>
        <div className={styles['post-comments']}>
          <FaRegCommentAlt className={styles['comments-img']} />
          <h2 className={styles['comments-num']}>{comments.length}</h2>
        </div>
      </div>
    </div>
  )
}

export default Post;