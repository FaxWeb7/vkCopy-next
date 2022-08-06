import { FC } from 'react'
import styles from './error404.module.scss'

const Error404: FC = () => {
  return (
    <section className={styles.error}>
      <span className={styles['error__word']}>Ошибка 404</span>
    </section>
  )
}

export default Error404;