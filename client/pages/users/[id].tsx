import User from "@/components/screens/User/User";
import { IUser } from "@/types/interfaces";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import MetaTitle from "../../app/meta/MetaTitle";
import { Context } from "../_app";

const profile: FC = () => {
  const {store} = useContext(Context)
  const router = useRouter()
  const [counter, setCounter] = useState<number>(0)
  const [user, setUser] = useState<IUser>({} as IUser)

  if (router.query.id !== undefined && counter === 0) {
    (async (): Promise<void> => {
      await store.getSecondUser(router.query.id)
      console.log(store.secondUser.posts)
      await setUser(store.secondUser)
      await setCounter(1)
    })()
  }
  
  return(
    <>
      <MetaTitle title={`${user.firstName} ${user.lastName}`} />
      <User user={user} />
    </>
  );
}

export default profile;