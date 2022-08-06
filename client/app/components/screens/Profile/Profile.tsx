import Push from "@/components/ui/Push/Push";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../../../../pages/_app";
import styles from './profile.module.scss'

const Profile = () => {
  const { store } = useContext(Context);
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])

  const Logout = async (): Promise<void> => {
    await store.logout();
    window.location.reload();
  }

  if (!store.isAuth) {
    return(
      <Push href="/" />
    )
  }

  return (
    <div>
      <h1>Email: {store.user.email}</h1>
      <h1>FirstName: {store.user.firstName}</h1>
      <h1>LastName: {store.user.lastName}</h1>
      <h1>Id: {store.user.id}</h1>
      <h1>{store.user.isActivated ? `Почта ${store.user.email} подтверждена` : 'Подтвердите почту!'}</h1>
      <button onClick={() => Logout()}>Выйти</button>
    </div>
  )
}

export default Profile;