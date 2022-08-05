import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from './_app';
import {observer} from 'mobx-react-lite'
import Loading from '@/components/ui/Loading/Loading';
import Auth from '@/components/screens/Auth/Auth';
import Profile from '@/components/screens/Profile/Profile';
import { useRouter } from 'next/router';

const Main: FC = () => {
  const {store} = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
    if (!store.isAuth){ router.push("/authorization") }
  }, [])
  
  if (store.isLoading){return <Loading />}
  if (!store.isAuth){return <Loading />}
  return <Profile />;
}

export default observer(Main);
