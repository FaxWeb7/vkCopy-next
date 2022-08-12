import Profile from "@/components/screens/Profile/Profile";
import { FC, useContext, useEffect } from "react";
import MetaTitle from "../../app/meta/MetaTitle";
import { Context } from "../_app";

const profile: FC = () => {
  const {store} = useContext(Context)
  
  return(
    <>
      <MetaTitle title='asd' />
      <h1>user</h1>
    </>
  );
}

export default profile;