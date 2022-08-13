import { FC, useContext, useEffect, useState } from 'react';
import styles from './postform.module.scss'
import { BsCameraFill } from 'react-icons/bs'
import { APP_URL } from '@/constants/constants';
import { Context } from '../../../../../pages/_app';
import { useRouter } from 'next/router';

const PostForm: FC<{avatarPath: string}> = ({ avatarPath }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [fileReader, setFileReader] = useState<any>()
  const [image, setImage] = useState<string>('')
  const {store} = useContext(Context)
  const router = useRouter()
  
  useEffect(() => {
    setFileReader(new FileReader())
  }, [])

  const handleOnChange = async (event: any): Promise<void> => {
    event.preventDefault();
    const file = await event.target.files[0];
    await fileReader?.readAsDataURL(file);
    fileReader.onload = function(e: any) {
      setImage(fileReader.result)
    }
  };

  const handlePost = async (): Promise<void> => {
    await store.addPost(router.query.id, image, inputValue)
    router.push(`/profile/${store.user.id}`)
  }
  
  return (
    <div className={styles.postform}>
      <img src={avatarPath} alt="" className={styles.img} />
      <input className={styles.input} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Что у вас нового?' />
      <div className={styles['image-wrapper']}>
        <span className={`${styles["image-span"]}`}><BsCameraFill /></span>
        <input
          className={`${styles["image-input"]}`}
          type="file"
          placeholder="Выберите аватарку"
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <button className={styles.btn} onClick={() => handlePost()}>Опубликовать</button>
    </div>
  )
}

export default PostForm;