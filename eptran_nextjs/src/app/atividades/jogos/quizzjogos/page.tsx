// pages/index.tsx
import Link from 'next/link';
import styles from '../styles/Quiz.module.css';

const Home: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.titulo}>
      <h1>QUIZ II</h1>
    </div>
    <Link href="/quiz/1">
      <button className={styles.button}>COMEÇAR</button>
    </Link>
    <Link href="/instructions">
      <button className={styles.button}>INSTRUÇÕES</button>
    </Link>
    <button className={`${styles.button} ${styles.hide}`}>CONQUISTAS</button>
  </div>
);

export default Home;
