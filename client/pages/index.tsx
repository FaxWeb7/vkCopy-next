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
  const [id, setId] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading){return <Loading />}

  if (typeof window === 'undefined'){
    if (!store.isAuth){return <Loading />}
  }

  if (typeof window !== 'undefined'){
    if (!store.isAuth){return <Push href="/authorization" />}
  }

  return (
    <>
      {store.user.id === 'undefined' ? <Loading /> : <Push href={`/profile/${store.user.id}`} />}
    </>
  )
}

export const getStaticProps = async () => {
  return{
    props: {
      withoutNav: true
    }
  }
}

export default observer(Main);
