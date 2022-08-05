import { FC } from "react";
import styles from './loading.module.scss'

const Loading: FC = () => {
  return (
    <section className={styles.loading}>
      <span className={styles["loading__anim"]}></span>
      <span className={styles.loadWords}>Загрузка...</span>
    </section>
  );
}

export default Loading;