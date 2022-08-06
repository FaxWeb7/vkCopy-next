import Head from 'next/head';
import { FC } from 'react';

const MetaRefresh: FC<{ to: string, seconds: string }> = ({ to, seconds }) => {
  return (
    <Head>
      <meta http-equiv="refresh" content={`${seconds}; url=${to}`} />
    </Head>
  )
}

export default MetaRefresh;