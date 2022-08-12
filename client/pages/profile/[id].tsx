import Profile from "@/components/screens/Profile/Profile";
import UserService from "@/service/UserService";
import { IUser } from "@/types/interfaces";
import { FC, useContext } from "react";
import MetaTitle from "../../app/meta/MetaTitle";
import { Context } from "../_app";

const profile: FC = () => {
  const {store} = useContext(Context)

  return(
    <>
      <MetaTitle title={`${store.user.firstName} ${store.user.lastName}` === 'undefined undefined' ? 'Загрузка' : `${store.user.firstName} ${store.user.lastName}` } />
      <Profile />
    </>
  );
}

export default profile;