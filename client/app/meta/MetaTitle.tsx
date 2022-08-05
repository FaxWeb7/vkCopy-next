import { ITitle } from "@/types/interfaces";
import Head from "next/head";
import { FC } from "react";

const MetaTitle: FC<ITitle> = ({ title }) => {
  const newTitle = `${title} | ВКонтакте`
  return (
    <Head>
      <title>{newTitle}</title>
    </Head>
  );
}

export default MetaTitle;