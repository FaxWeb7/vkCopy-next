import Registration from "@/components/screens/Registration/Registration";
import MetaTitle from "meta/MetaTitle";
import { FC } from "react";

const registration: FC<{withoutNav: boolean}> = ({ withoutNav }) => {
  return (
    <>
      <MetaTitle title="Регистрация" />
      <Registration />
    </>
  );
}

export const getStaticProps = async () => {
  return{
    props: {
      withoutNav: true
    }
  }
}

export default registration;