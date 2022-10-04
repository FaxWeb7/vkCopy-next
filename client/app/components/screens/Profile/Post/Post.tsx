import { APP_URL } from '@/constants/constants';
import { FC, useContext, useState } from 'react';
import styles from './post.module.scss'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { FaRegCommentAlt } from 'react-icons/fa'
import { Context } from '../../../../../pages/_app';
import { IComment, IPost } from '@/types/interfaces';
import { Router, useRouter } from 'next/router';
import DeleteComment from '../DeleteComment/DeleteComment';

const Post: FC<IPost> = ({ text, image, likes, comments, date, _id }) => {
  const [isLikeActive, setIsLikeActive] = useState<boolean>(false)
  const [isMore, setIsMore] = useState<boolean>(false)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isComment, setIsComment] = useState<boolean>(false)
  const [avatarPaths, setAvatarPaths] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [commentValue, setCommentValue] = useState<string>('')
  const [emptyComment, setEmptyComment] = useState<boolean>(false)
  const {store} = useContext(Context)
  const router = useRouter()
  const postId = _id;
  const [localUser, setLocalUser] = useState<IPost>({text: text, image: image, likes: likes, comments: comments, date: date, _id: _id})
  var prevLocalUser = localUser
  // const [likess, setLikes] = useState<number>(likes)
  
  const changeLikes = async (): Promise<void> => {
    const userId = router.query.id
    if (!isLikeActive){
      setIsLikeActive(true)
      await store.addLike(userId, _id)
      if (router.asPath[1] === 'p'){
        router.push(`/profile/${userId}`)
      }
      if (router.asPath[1] === 'u'){
        await router.push(`/users/${userId}`)
        prevLocalUser.likes = prevLocalUser.likes + 1
        setLocalUser(prevLocalUser)
        router.push(`/users/${userId}`)
      }
    }
    if (isLikeActive){
      setIsLikeActive(false)
      await store.deleteLike(userId, _id)
      if (router.asPath[1] === 'p'){
        router.push(`/profile/${userId}`)
      }
      if (router.asPath[1] === 'u'){
        await router.push(`/users/${userId}`)
        prevLocalUser.likes = prevLocalUser.likes - 1
        setLocalUser(prevLocalUser)
        router.push(`/users/${userId}`)
      }
    }
  }

  const deletePost = async (): Promise<void> => {
    await store.deletePost(store.user.id, _id)
    router.push(`/profile/${store.user.id}`)
  }

  const checkClientAuth = async (): Promise<void> => {await store.checkAuth()}
  const getFriend = async (): Promise<void> => {
    await store.getSecondUser(router.query.id)
    setAvatarPaths(store.secondUser.avatarPath)
    setName(`${store.secondUser.firstName} ${store.secondUser.lastName}`)
    setIsAuth(true)
  }

  const handleComment = async (): Promise<void> => {
    if (commentValue !== '') {
      await store.addComment(router.query.id, store.user.id, commentValue, _id)
      if (router.asPath[1] === 'p'){
        await router.push(`/profile/${store.user.id}`)
      }
      if (router.asPath[1] === 'u'){
        await router.push(`/users/${router.query.id}`)
        prevLocalUser.comments = 
        setLocalUser(prevLocalUser)
        router.push(`/users/${router.query.id}`)
      }
      setCommentValue('')
    } else{
      setEmptyComment(true)
    }
  }

  if (router.query !== undefined) {
    (async (): Promise<void> => {
      await checkClientAuth()
      await getFriend()
    })()
  } 

  return (
    <>
      {!isAuth ? <h1>Загрузка...</h1> :
      (
        <div className={styles.post}>
          <div className={styles['post-info']}>
            <img src={avatarPaths || store.user.avatarPath || `${APP_URL}/common/defaultAvatar.jpg`} alt="" className={styles['post-avatar']} />
            <div className={styles['post-info-content']}>
              <h2 className={styles['post-name']}>{name || `${store.user.firstName} ${store.user.lastName}`}</h2>
              <h2 className={styles['post-time']}>{date}</h2>
            </div>
            {router.pathname[2] === 'r' && <button className={styles['post-more']} onClick={() => setIsMore(!isMore)}><MdOutlineMoreHoriz /></button>}
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
              <h2 className={styles['likes-num']}>{localUser.likes}</h2>
            </div>
            <div className={styles['post-comments']}>
              <FaRegCommentAlt className={isComment ? `${styles['comments-img']} ${styles.active}` : styles['comments-img']}  onClick={() => setIsComment(!isComment)}/>
              <h2 className={styles['comments-num']}>{comments.length}</h2>
            </div>
          </div>
          {isComment && (
            <div className={styles['comments']}>
              <div className={styles.postform}>
                <img src={store.user.avatarPath} alt="" className={styles.img} />
                <input className={styles.input} value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder={emptyComment ? 'Это поле обязательно!' : 'Комментарий к посту'} />
                <button className={styles.btn} onClick={() => handleComment()}>Опубликовать</button>
              </div>
              <div className={styles.line}></div>
              <ul className={styles['comments-list']}>
                {comments.map(({ avatarPath, firstName, lastName, text, date, _id } : IComment, value: number) => {
                  return(
                    <li key={value} className={styles['comments-item']}>
                      <div className={styles['item-content']}>
                        <img className={styles['item-avatar']} src={avatarPath} alt="" />
                        <div className={styles['item-data']}>
                          <h3 className={styles['item-name']}>{firstName} {lastName}</h3>
                          <p className={styles['item-text']}>{text}</p>
                          <div className={styles['item-date']}>{date}</div>
                        </div>
                        {firstName == store.user.firstName && lastName == store.user.lastName && avatarPath == store.user.avatarPath ? <DeleteComment postId={postId} commentId={_id}/> : null}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Post;
