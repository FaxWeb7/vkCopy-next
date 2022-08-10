import { APP_URL } from '@/constants/constants';
import { FC, useState } from 'react';
import styles from './post.module.scss'
import { FcLike } from 'react-icons/fc'
import { FaRegCommentAlt } from 'react-icons/fa'

const Post: FC<{link: string, avatarPath: string, firstName: string, lastName: string, time: string, text: string, image?: string}> = ({link, avatarPath, firstName, lastName, time, text, image}) => {
  const [isLikeActive, setIsLikeActive] = useState<boolean>(false)

  return (
    <div className={styles.post}>
      <div className={styles['post-info']}>
        <img src={avatarPath} alt="" className={styles['post-avatar']} />
        <div className={styles['post-info-content']}>
          <h2 className={styles['post-name']}><a href={link}>{firstName} {lastName}</a></h2>
          <h2 className={styles['post-time']}>{time}</h2>
        </div>
      </div>
      <div className={styles['post-content']}>
        <p className={styles['post-text']}>{text}</p>
        <img src={image} className={styles['post-image']} />
      </div>
      <div className={styles['post-options']}>
        <div className={styles['post-likes']} onClick={() => setIsLikeActive(!isLikeActive)}>
        <svg className={isLikeActive ? `${styles['likes-img']} ${styles.active}` : `${styles['likes-img']}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
          <h2 className={styles['likes-num']}>495</h2>
        </div>
        <div className={styles['post-comments']}>
          <FaRegCommentAlt className={styles['comments-img']} />
          <h2 className={styles['comments-num']}>352</h2>
        </div>
      </div>
    </div>
  )
}

export default Post;