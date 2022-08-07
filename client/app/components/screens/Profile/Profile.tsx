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

  if (!store.isAuth) {
    return(
      <Push href="/authorization" />
    )
  }

  return (
    <section className="profile">
      <div className="container">
        <div className="inner">
          
        </div>
      </div>
    </section>
  )
}

export default Profile;