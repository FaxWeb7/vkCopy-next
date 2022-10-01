import UserService from '@/service/UserService';
import { IUser } from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../pages/_app';
import styles from './conversationlist.module.scss'

const ConversationList: FC = () => {
  const [users, setUsers] = useState<Array<IUser>>([])
  const [isAuth, setIsAuth] =useState<boolean>(false)
  const {store} = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    getUsers()
    if (localStorage.getItem("token")) {
      store.checkAuth()
      store.setLoading(true)
    }
  }, [])

  const getUsers = async () => {
    try{
      const response = await UserService.fetchUsers();
      setUsers(response.data)
    } catch(e){
      console.log(e)
    }
  }

  const checkClientAuth = async (): Promise<void> => {await store.checkAuth(); setIsAuth(true)}

  if (router.query !== undefined) {
    checkClientAuth()
  }

  return (
    <>
      {isAuth === false ? (
        <>
          <h1>Загрузка...</h1>
        </>
      ) :
        <section className={styles.users}>
          <h2 className={styles.title}>Мессенджер</h2>
          <ul className={styles.list}>
            {users.map(({ _id, avatarPath, firstName, lastName }: IUser, value) => {
              if (value === users.length - 1) store.setLoading(false)
              if (_id === store.user.id) return null
              return(
                <li className={styles['list-item']} key={value}>
                  <Link href={{
                    pathname: `/conversations/[id]`,
                    query: { id: `${_id}` }
                    }}><img src={avatarPath} className={styles['avatar']} /></Link>
                  <div className={styles['content']}>
                    <Link href={{
                      pathname: `/conversations/[id]`,
                      query: { id: `${_id}` }
                      }}><h3 className={styles.name}>{firstName} {lastName}</h3></Link>
                    <div className={styles.links}>
                      <Link href={{
                        pathname: `/conversations/[id]`,
                        query: { id: `${_id}` }
                        }}><h4 className={styles['links-item']}>Посмотреть диалог</h4></Link>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>}
      </>
  )
}

export default ConversationList;