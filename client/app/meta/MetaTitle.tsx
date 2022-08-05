import Head from "next/head";
import { FC } from "react";

interface ITitle{
  title: string
}

const MetaTitle: FC<ITitle> = ({ title }) => {
  return (
    <Head>
      <title>{title} | ВКонтакте</title>
    </Head>
  );
}

export default MetaTitle;