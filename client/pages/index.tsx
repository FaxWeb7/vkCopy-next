import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from './_app';
import LoginForm from '@/components/loginForm'
import {observer} from 'mobx-react-lite'
import { IUser } from '@/models/IUser';
import UserService from '@/service/UserService';

const App: FC = () => {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
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

  if (store.isLoading){return( <h1>Загрузка...</h1> )}

  if (!store.isAuth){return( <LoginForm /> )}

  return (
    <>
      <h1>{store.isAuth ? `Пользователь ${store.user.email} авторизован` : 'Авторизуйтесь!'}</h1>
      <h1>{store.user.isActivated ? `Почта ${store.user.email} подтверждена` : 'Подтвердите почту!'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={() => getUsers()}>Получить пользователей</button>
        {users.map(user => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    </>
  );
}

export default observer(App);
