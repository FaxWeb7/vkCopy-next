import MetaTitle from "meta/MetaTitle";
import { FC } from "react";
import styles from './loading.module.scss'

const Loading: FC = () => {
  return (
    <>
      <MetaTitle title='Загрузка...' />
      <section className={styles.loading}>
        <span className={styles["loading__anim"]}></span>
        <span className={styles.loadWords}>Загрузка...</span>
      </section>
    </>
  );
}

export default Loading;