import { APP_URL } from '@/constants/constants';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../pages/_app';
import styles from './navbar.module.scss'
import { MdExpandMore } from 'react-icons/md'
import { PrimaryNavLinks, SecondaryNavLinks } from './NavLinks';

const NavBar: FC = () => {
  const { store } = useContext(Context)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const Logout = async (): Promise<void> => {
    await store.logout();
    router.push('/')
  }
  
  const checkClientAuth = async (): Promise<void> => {await store.checkAuth(); router.push(router.asPath)}
  useEffect(() => {
    if (router.query.id !== undefined) {
      checkClientAuth()
    } else if (router.pathname.split('')[`${router.pathname.split('').length - 1}`] !== ']'){
      checkClientAuth()
    } 
  }, [isAuth])

  return (
    <>
      {!store.isAuth ? (
        <>
          <h1>Загрузка...</h1>
          {isAuth === false ? setIsAuth(true) : null}
        </>
      ) : 
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <div className={styles.profile}>
            <a href={`/profile/${store.user.id}`}>
              <img src={store.user.avatarPath || `${APP_URL}/avatars/defaultAvatar.jpg`} alt="avatar" className={styles["profile-avatar"]} />
            </a>
            <a href={`/profile/${store.user.id}`} className={styles["profile-name"]}>{store.user.firstName} {store.user.lastName}</a>
            <MdExpandMore className={isOpen ? `${styles['profile-btn']} ${styles['profile-btn-active']}` : styles['profile-btn']} onClick={() => setIsOpen(!isOpen)} />
            <button className={isOpen ? `${styles['profile-exit']} ${styles['profile-exit-active']}` : styles['profile-exit']} onClick={() => Logout()}>Выйти</button>
          </div>
          <ul className={styles["link-list"]}>
            {PrimaryNavLinks.map(({ img, title, link }, id) => (
              <li className={router.route == link ? `${styles["list-item"]} ${styles["active"]}` : styles["list-item"]} key={id}>
                {img}
                <a href={link === '/profile' ? `${link}/${store.user.id}` : link} className={styles["item-text"]}>{title}</a>
              </li>
            ))}
          </ul>
          <ul className={styles["link-list"]}>
            {SecondaryNavLinks.map(({ img, title, link }, id) => (
              <li className={styles["list-item"]} key={id}>
                {img}
                <a href={link} className={styles["item-text"]}>{title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>}
    </>
  )
}

export default NavBar;