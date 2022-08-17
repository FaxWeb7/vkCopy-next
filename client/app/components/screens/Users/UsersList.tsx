import { APP_URL } from '@/constants/constants';
import UserService from '@/service/UserService';
import { IUser } from '@/types/interfaces';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../pages/_app';
import styles from './userslist.module.scss'

const UsersList: FC = () => {
  const [users, setUsers] = useState<Array<IUser>>([])
  const {store} = useContext(Context)

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

  return (
    <section className={styles.users}>
      <h2 className={styles.title}>Все пользователи</h2>
      {store.isLoading && <h1 className='asd'>Загрузка...</h1>}
      <ul className={styles.list}>
        {users.map(({ _id, avatarPath, firstName, lastName }: IUser, value) => {
          if (value === users.length - 1) store.setLoading(false)
          if (_id === store.user.id) return null
          return(
            <li className={styles['list-item']} key={value}>
              <a href={`/users/${_id}`}><img src={avatarPath} className={styles['avatar']} /></a>
              <div className={styles['content']}>
                <a href={`/users/${_id}`} className={styles.name}>{firstName} {lastName}</a>
                <div className={styles.links}>
                  <a href={`/users/${_id}`} className={styles['links-item']}>Посмотреть профиль</a> <span>|</span>
                  <a href={`/users/${_id}`} className={styles['links-item']}>Написать сообщение</a>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default UsersList;