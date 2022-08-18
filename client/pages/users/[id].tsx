import Profile from "@/components/screens/Profile/Profile";
import User from "@/components/screens/User/User";
import { FC, useContext, useEffect } from "react";
import MetaTitle from "../../app/meta/MetaTitle";
import { Context } from "../_app";

const profile: FC = () => {
  const {store} = useContext(Context)
  
  return(
    <>
      <MetaTitle title='user' />
      <User />
    </>
  );
}

export default profile;