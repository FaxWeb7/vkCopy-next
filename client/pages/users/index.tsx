import UsersList from '@/components/screens/Users/UsersList';
import MetaTitle from 'meta/MetaTitle';
import { FC } from 'react';

const users: FC = () => {
  return (
    <>
      <MetaTitle title='Пользователи' />
      <UsersList />
    </>
  )
}

export default users;