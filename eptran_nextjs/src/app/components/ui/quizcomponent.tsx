// components/QuizComponent.tsx
import { useState } from 'react';
import { Question } from '../../atividades/jogos/quizzjogos/types';
import styles from '../styles/Quiz.module.css';

const questions: Question[] = [
  // Insert the questions array from Script.js here
];

interface quizcomponentProps {
  questionId: number;
}

const QuizComponent: React.FC<quizcomponentProps> = ({ questionId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(questionId - 1);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setTotalCorrect(totalCorrect + 1);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const scoreMessage = getScoreMessage(totalCorrect / questions.length);
    return (
      <div className={styles.finalResult}>
        <p>Você acertou {totalCorrect} de {questions.length} perguntas!</p>
        <p>Resultado: {scoreMessage}</p>
        <button onClick={() => location.reload()} className={styles.button}>
          Refazer teste
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className={styles.quizContainer}>
      <h2>{question.questao}</h2>
      <img src={`/images/${question.imagem}`} alt="Imagem da pergunta" className={styles.questaoImagem} />
      <div className={styles.RespostaContainer}>
        {question.respostas.map((resposta, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(resposta.correct)}
            className={resposta.correct ? styles.correct : styles.incorrect}
          >
            {resposta.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function getScoreMessage(score: number): string {
  if (score > 0.9) return 'Excelente';
  if (score > 0.7) return 'Good vibes';
  if (score > 0.5) return 'Melhore!!';
  if (score > 0.3) return 'Você pode matar alguém no trânsito!!';
  return 'Você chegou no fundo do poço!!';
}

export default QuizComponent;
