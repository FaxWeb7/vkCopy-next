import Profile from "@/components/screens/Profile/Profile";
import { FC } from "react";
import MetaTitle from "../app/meta/MetaTitle";

const profile: FC = () => {
  return(
    <>
      <MetaTitle title="имя" />
      <Profile />
    </>
  );
}

export default profile;