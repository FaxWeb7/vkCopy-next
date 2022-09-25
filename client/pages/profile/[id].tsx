import Profile from "@/components/screens/Profile/Profile";
import UserService from "@/service/UserService";
import { IUser } from "@/types/interfaces";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import MetaTitle from "../../app/meta/MetaTitle";
import { Context } from "../_app";

const profile: FC = () => {
  const {store} = useContext(Context)
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()

  const checkClientAuth = async (): Promise<void> => {await store.checkAuth(); setIsAuth(true)}

  if (router.query !== undefined) {
    checkClientAuth()
  }

  return(
    <>
      {!isAuth ? <h1>Загрузка...</h1> : (
        <>
          <MetaTitle title={`${store.user.firstName} ${store.user.lastName}`} />
          <Profile />
        </>
      )}
    </>
  );
}

export default profile;