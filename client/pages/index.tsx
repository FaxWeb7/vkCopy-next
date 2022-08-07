import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from './_app';
import {observer} from 'mobx-react-lite'
import Loading from '@/components/ui/Loading/Loading';
import Auth from '@/components/screens/Auth/Auth';
import { useRouter } from 'next/router';
import Push from '@/components/ui/Push/Push';
import MetaTitle from 'meta/MetaTitle';

const Main: FC<{withoutNav: boolean}> = ({ withoutNav }) => {
  const {store} = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading){return <Loading />}

  if (!store.isAuth){return <Push href="/authorization" />}

  return <Push href='/profile' />
}

export const getStaticProps = async () => {
  return{
    props: {
      withoutNav: true
    }
  }
}

export default observer(Main);
