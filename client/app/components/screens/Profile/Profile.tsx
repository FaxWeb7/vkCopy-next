import Loading from "@/components/ui/Loading/Loading";
import Push from "@/components/ui/Push/Push";
import { APP_URL } from "@/constants/constants";
import UserService from "@/service/UserService";
import { IFriend, IPost, IUser } from "@/types/interfaces";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { useEffect } from "react";
import { Context } from "../../../../pages/_app";
import Post from "./Post/Post";
import styles from './profile.module.scss'
import {BsCameraFill} from 'react-icons/bs'

const Profile: FC = () => {
  const { store } = useContext(Context);
  const [isMore, setIsMore] = useState<boolean>(false)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [fileReader, setFileReader] = useState<any>()
  const [inputValue, setInputValue] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [friends, setFriends] = useState<IUser[]>([{} as IUser])
  const [empty, setEmpty] = useState<boolean>(false)
  const [submitActive, setSubmitActive] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string>(`${APP_URL}/common/defaultAvatar.jpg`)
  const router = useRouter()

  useEffect(() => {
    setFileReader(new FileReader())
  }, [])

  const getFriends = async (): Promise<void> => {
    try{
      await store.user.friends.map(({ friendId, _id }) => {
        (async (friendId: string): Promise<void> => {
          const response = await store.getFriend(friendId)
          setFriends([response ? response : {} as IUser])
        })(friendId)
      })
      setIsAuth(true)
    } catch(e){
      console.log(e)
    }
  }

  const handleOnChange = async (event: any, s?: boolean): Promise<void> => {
    event.preventDefault();
    const file = await event.target.files[0];
    await fileReader?.readAsDataURL(file);
    fileReader.onload = function(e: any) {
      s ? setImage(fileReader.result) : setAvatar(fileReader.result)
      s ? null : setSubmitActive(true)
    }
  };

  const handleChangeAvatar = async (): Promise<void> => {
    await store.changeAvatar(router.query.id, avatar)
    setSubmitActive(false)
    router.push(`/profile/${store.user.id}`)
  }

  const handlePost = async (): Promise<void> => {
    if (inputValue !== '') {
      await store.addPost(router.query.id, image, inputValue)
      router.push(`/profile/${store.user.id}`)
      setInputValue('')
      setImage('')
    } else{
      setEmpty(true)
    }
  }

  БЕСКОНЕЧНЫЙ ЦИКЛ ЗАПРОСА ДРУЗЕЙ 
  В СПИСОК ВСЕХ ДРУЗЕЙ ДОБАВЛЯЕТСЯ ТОЛЬКО ПОСЛЕДНИЙ, НУЖНО ЧТОБЫ ОНИ ПЛЮСОВАЛИСЬ

  const checkClientAuth = async (): Promise<void> => {await store.checkAuth()}
  if (router.query !== undefined) {
    (async () => {
      await checkClientAuth()
      getFriends()
    })()
  } 


  return (
    <>
      {isAuth === false ? (
        <>
          <h1>Загрузка...</h1>
        </>
      ) :
      <section className={styles.profile}>
        <div className={styles.inner}>
          <div className={styles.about}>
            <div className={styles['about-avatar']}>
              <img className={styles['avatar-img']} src={store.user.avatarPath} alt="avatar" />
              <div className={styles['input-wrapper']}>
                <button className={styles['avatar-btn']}>Изменить аватарку</button>
                <input type="file" className={styles['avatar-input']} onChange={(e) => handleOnChange(e)} />
              </div>
                {submitActive && <button className={styles['avatar-submit']} onClick={() => handleChangeAvatar()}>Готово</button>}
            </div>
            <div className={styles['about-users']}>
              <h2 className={styles['users-title']}>Друзья</h2>
              <ul className={styles['users-list']}>
                {friends.map(({ _id, avatarPath, firstName }: IUser, value: any) => {
                  console.log(firstName)
                  if (_id === store.user.id) return null
                  if (value === friends.length - 1){
                    store.setLoading(false)
                  }
                  if (value <= 14 || isMore) {
                    return (
                      <a href={`/users/${_id}`} key={value} className={styles['users-item']}>
                        <img src={avatarPath || `${APP_URL}/common/defaultAvatar.jpg`} className={styles['item-img']} alt="" />
                        <h2 className={styles['item-name']}>{firstName}</h2>
                      </a>
                    )
                  }
                  })}
              </ul>
                {/* {store.isLoading && <h1 className={styles['users-loading']}>Загрузка...</h1>} */}
              {/* <h2 className={styles['users-more']} onClick={() => setIsMore(!isMore)}>{users.length <= 15 ? '' : !isMore ? 'Показать больше' : 'Показать меньше'}</h2> */}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles['content-about']}>
              <h1 className={styles['content-about-name']}>{store.user.firstName} {store.user.lastName}</h1>
              <div className="line"></div>
              <div className={styles['content-about-info']}>
                <h2 className={styles['content-about-info-item']}>{store.user?.friends?.length || 0}<span> Друзей</span></h2>
                <div className="line-up"></div>
                <h2 className={styles['content-about-info-item']}>{store?.user?.posts?.length || 0}<span> Постов</span></h2>
              </div>
            </div>
            <div className={styles.postform}>
              <img src={store.user.avatarPath} alt="" className={styles.img} />
              <input className={styles.input} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={empty ? 'Это поле обязательно к заполнению !!!' : 'Что у вас нового?'} />
              <div className={styles['image-wrapper']}>
                <span className={`${styles["image-span"]}`}><BsCameraFill /></span>
                <input
                  className={`${styles["image-input"]}`}
                  type="file"
                  placeholder="Выберите аватарку"
                  onChange={(e) => handleOnChange(e, true)}
                />
              </div>
              <button className={styles.btn} onClick={() => handlePost()}>Опубликовать</button>
            </div>
            <h2 className={styles['posts-title']}>Все посты</h2>
            <div className={styles['posts-list']}>
              {store?.user?.posts?.map(({ text, image, likes, comments, date, _id }: IPost) => (
                <Post key={_id} _id={_id} text={text} image={image} likes={likes} comments={comments} date={date} />
              ))}
            </div>
          </div>
        </div>
      </section>}
    </>
  )
}

export default Profile;