import { APP_URL } from '@/constants/constants';
import { FC } from 'react';
import styles from './post.module.scss'

const Post: FC<{link: string, avatarPath: string, firstName: string, lastName: string, time: string, text: string, image?: string}> = ({link, avatarPath, firstName, lastName, time, text, image}) => {
  return (
    <div className={styles.post}>
      <div className={styles['post-info']}>
        <img src={avatarPath} alt="" className={styles['post-avatar']} />
        <div className={styles['post-info-content']}>
          <h2 className={styles['post-name']}><a>{firstName} {lastName}</a></h2>
          <h2 className={styles['post-time']}>{time}</h2>
        </div>
      </div>
      <div className={styles['post-content']}>
        <p className={styles['post-text']}>{text}</p>
      </div>
      <div className={styles['post-options']}></div>
    </div>
  )
}

export default Post;