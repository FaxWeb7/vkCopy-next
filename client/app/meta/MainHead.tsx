import { APP_URL } from '@/constants/constants';
import Head from 'next/head';
import { FC } from 'react';

const MainHead: FC = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
      <link type="image/x-icon" rel="shortcut icon" href={`${APP_URL}/favicon.ico`} />
      <link rel="apple-touch-icon" href={`${APP_URL}/apple-favicon.png`} />
      <meta name="theme-color" content="#101014" />
    </Head>
  )
}

export default MainHead;