import Head from "next/head";
import { FC } from "react";

const MetaTitle: FC<{title: string}> = ({ title }) => {
  const newTitle = `${title} | ВКонтакте`
  return (
    <Head>
      <title>{newTitle}</title>
    </Head>
  );
}

export default MetaTitle;