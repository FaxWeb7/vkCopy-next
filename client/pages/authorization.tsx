import Auth from "@/components/screens/Auth/Auth";
import MetaTitle from "meta/MetaTitle";
import { FC } from "react";

const Authorization: FC = () => {
  return (
    <>
      <MetaTitle title="Авторизация" />
      <Auth />
    </>
  );
}

export default Authorization;