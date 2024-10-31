// pages/instructions.tsx
import { useRouter } from 'next/router';
import styles from '../styles/Quiz.module.css';

const Instructions: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.instrucoesContainer}>
      <h1 className={styles.tituloInstr}>INSTRUÇÕES</h1>
      <p className={styles.instrucoesTexto}>
        Este quiz contém 20 questões desafiadoras sobre regras de trânsito, com foco em canalizações e condutas. Teste seus conhecimentos e se divirta enquanto aprende! Concentre-se para obter uma boa pontuação e, se precisar, jogue novamente quantas vezes quiser para melhorar seu desempenho.
      </p>
      <button onClick={() => router.back()} className={styles.button}>Voltar</button>
    </div>
  );
};

export default Instructions;
