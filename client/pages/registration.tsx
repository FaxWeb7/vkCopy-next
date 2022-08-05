import Registration from "@/components/screens/Registration/Registration";
import MetaTitle from "meta/MetaTitle";
import { FC } from "react";

const registration: FC = () => {
  return (
    <>
      <MetaTitle title="Регистрация" />
      <Registration />
    </>
  );
}

export default registration;