import { APP_URL } from '@/constants/constants';
import { FC, useContext, useState } from 'react';
import styles from './postform.module.scss'
import { BsCameraFill } from 'react-icons/bs'
import { Context } from '../../../../../pages/_app';

const PostForm: FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const {store} = useContext(Context)
  
  return (
    <div className={styles.postform}>
      <img src={store.user.avatarPath} alt="" className={styles.img} />
      <input className={styles.input} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Что у вас нового?' />
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