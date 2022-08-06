import Auth from '@/components/screens/Auth/Auth';
import MetaTitle from 'meta/MetaTitle';
import { FC } from 'react';

const Authorization: FC<{withoutNav: boolean}> = ({ withoutNav }) => {
  return (
    <>
      <MetaTitle title='Вход' />
      <Auth />
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

export default Authorization;