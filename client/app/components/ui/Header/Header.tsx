import { APP_URL } from '@/constants/constants';
import { FC } from 'react';
import styles from './header.module.scss'
import { BiSearch } from 'react-icons/bi'
import { IoMdNotifications } from 'react-icons/io'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles['inner']}>
          <a href="/"><img src={`${APP_URL}/common/logo-white.svg`} alt="logo" className={styles['logo']} /></a>
          <div className={styles["content"]}>
            <div className={styles["search"]}>
              <input type='text' placeholder="Поиск" className={styles["search-input"]} /> 
              <BiSearch className={styles["search-button"]} />
            </div>
            <div className={styles.notification}>
              <IoMdNotifications className={styles["notification-logo"]}/>
              <h3 className={styles["notification-title"]}>Уведомления</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.line} />
    </header>
    
  )
}

export default Header;