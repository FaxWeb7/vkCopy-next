import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../../../../pages/_app";

const Profile = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])
  console.log(store.user)
  return (
    <div>
      <h1>Email: {store.user.email}</h1>
      <h1>FirstName: {store.user.firstName}</h1>
      <h1>LastName: {store.user.lastName}</h1>
      <h1>Id: {store.user.id}</h1>
      <h1>IsActivated: {store.user.isActivated}</h1>
    </div>
  )
}

export default Profile;