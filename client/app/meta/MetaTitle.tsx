import { ITitle } from "@/types/interfaces";
import Head from "next/head";
import { FC } from "react";

const MetaTitle: FC<ITitle> = ({ title }) => {
  return (
    <Head>
      <title>{title} | ВКонтакте</title>
    </Head>
  );
}

export default MetaTitle;