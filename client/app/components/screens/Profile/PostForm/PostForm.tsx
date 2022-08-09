import { APP_URL } from '@/constants/constants';
import { FC } from 'react';
import styles from './postform.module.scss'
import { BsCameraFill } from 'react-icons/bs'

const PostForm: FC = () => {
  return (
    <div className={styles.postform}>
      <img src={`${APP_URL}/avatars/defaultAvatar.jpg`} alt="" className={styles.img} />
      <input className={styles.input} placeholder='Что у вас нового?' />
      <div className={styles['image-wrapper']}>
        <span className={`${styles["image-span"]}`}><BsCameraFill /></span>
        <input
          className={`${styles["image-input"]}`}
          type="file"
          placeholder="Выберите аватарку"
        />
      </div>
      <button className={styles.btn}>Опубликовать</button>
    </div>
  )
}

export default PostForm;