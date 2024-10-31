// pages/quiz/[id].tsx
import { useRouter } from 'next/router';
import QuizComponent from '../../../components/ui/quizcomponent';
import styles from '../../styles/Quiz.module.css';

const QuizPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <QuizComponent questionId={parseInt(id as string, 10)} />
    </div>
  );
};

export default QuizPage;
