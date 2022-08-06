import Error404 from '@/components/screens/404/Error404';
import { APP_URL } from '@/constants/constants';
import MetaRefresh from 'meta/MetaRefresh';
import MetaTitle from 'meta/MetaTitle';
import { FC } from 'react';

const Error: FC = () => {
  return (
    <>
      <MetaTitle title="Ошибка 404" />
      <MetaRefresh to={`${APP_URL}`} seconds="3" />
      <Error404 />
    </>
  )
}

export default Error;