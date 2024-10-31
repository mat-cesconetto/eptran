"use client"

// types.ts
interface Question {
    questao: string;
    imagem?: string;
    respostas: Answer[];
}

interface Answer {
    text: string;
    correct: boolean;
}

interface QuizState {
    questaoAtual: number;
    totalAcertos: number;
    isGameStarted: boolean;
    showInstructions: boolean;
    questions: Question[];
}

// App.tsx
import React, { useState } from 'react';
import { questions } from './questions';

const App: React.FC = () => {
    const [state, setState] = useState<QuizState>({
        questaoAtual: 0,
        totalAcertos: 0,
        isGameStarted: false,
        showInstructions: false,
        questions: questions
    });

    const iniciarJogo = () => {
        setState(prev => ({
            ...prev,
            isGameStarted: true,
            questions: embaralharQuestoes([...prev.questions])
        }));
    };

    const mostrarInstrucoes = () => {
        setState(prev => ({
            ...prev,
            showInstructions: true,
            isGameStarted: false
        }));
    };

    const voltarAoInicio = () => {
        setState(prev => ({
            ...prev,
            showInstructions: false
        }));
    };

    return (
        <div className="container">
            {!state.isGameStarted && !state.showInstructions && (
                <TelaInicial 
                    onStartGame={iniciarJogo}
                    onShowInstructions={mostrarInstrucoes}
                />
            )}
            
            {state.showInstructions && (
                <Instrucoes onVoltar={voltarAoInicio} />
            )}
            
            {state.isGameStarted && (
                <Quiz 
                    state={state}
                    setState={setState}
                />
            )}
        </div>
    );
};

// TelaInicial.tsx
interface TelaInicialProps {
    onStartGame: () => void;
    onShowInstructions: () => void;
}

const TelaInicial: React.FC<TelaInicialProps> = ({ onStartGame, onShowInstructions }) => {
    return (
        <>
            <div className="titulo">
                <h1>QUIZ II</h1>
            </div>
            <button onClick={onStartGame} className="comecar-quizz">
                COMEÇAR
            </button>
            <button onClick={onShowInstructions} className="instrucao-quizz">
                INSTRUÇÕES
            </button>
            <button className="conquistas-quizz">
                CONQUISTAS
            </button>
        </>
    );
};

// Instrucoes.tsx
interface InstrucoesProps {
    onVoltar: () => void;
}

const Instrucoes: React.FC<InstrucoesProps> = ({ onVoltar }) => {
    return (
        <>
            <h1 className="titulo-instr">INSTRUÇÕES</h1>
            <div className="instrucoes-container">
                <p className="instrucoes-texto">
                    Este quiz contém 20 questões desafiadoras sobre regras de trânsito, 
                    com foco em canalizações e condutas. Teste seus conhecimentos e se 
                    divirta enquanto aprende! Concentre-se para obter uma boa pontuação 
                    e, se precisar, jogue novamente quantas vezes quiser para melhorar 
                    seu desempenho.
                </p>
                <div className="botoes-container">
                    <button onClick={onVoltar} className="voltar button">
                        Voltar
                    </button>
                </div>
            </div>
        </>
    );
};

// Quiz.tsx
interface QuizProps {
    state: QuizState;
    setState: React.Dispatch<React.SetStateAction<QuizState>>;
}

const Quiz: React.FC<QuizProps> = ({ state, setState }) => {
    const { questaoAtual, totalAcertos, questions } = state;

    const handleAnswerClick = (correct: boolean) => {
        if (correct) {
            setState(prev => ({
                ...prev,
                totalAcertos: prev.totalAcertos + 1
            }));
        }

        setTimeout(() => {
            setState(prev => ({
                ...prev,
                questaoAtual: prev.questaoAtual + 1
            }));
        }, 2000);
    };

    if (questaoAtual >= questions.length) {
        return <FinalJogo totalAcertos={totalAcertos} totalQuestoes={questions.length} />;
    }

    const currentQuestion = questions[questaoAtual];

    return (
        <div className="questao-container">
            <p className="questao">{currentQuestion.questao}</p>
            {currentQuestion.imagem && (
                <img 
                    src={currentQuestion.imagem} 
                    alt="Questão" 
                    className="questao-imagem" 
                />
            )}
            <div className="Resposta-container">
                {currentQuestion.respostas.map((resposta, index) => (
                    <button
                        key={index}
                        className="button resposta"
                        onClick={() => handleAnswerClick(resposta.correct)}
                    >
                        {resposta.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

// FinalJogo.tsx
interface FinalJogoProps {
    totalAcertos: number;
    totalQuestoes: number;
}

const FinalJogo: React.FC<FinalJogoProps> = ({ totalAcertos, totalQuestoes }) => {
    const performace = Math.floor(totalAcertos * 100 / totalQuestoes);
    
    const getMensagem = (performace: number): string => {
        if (performace > 90) return "excelente";
        if (performace > 70) return "Good vibes";
        if (performace > 50) return "Melhore!!";
        if (performace > 30) return "Você pode matar alguém no trânsito!!";
        return "Você chegou no fundo do poço!!";
    };

    return (
        <div className="questao-container">
            <p className="Finalpp">
                Você acertou {totalAcertos} de {totalQuestoes} perguntas!!
                <span>Resultado: {getMensagem(performace)}</span>
            </p>
            <button 
                onClick={() => window.location.reload()} 
                className="button"
            >
                Refazer teste
            </button>
        </div>
    );
};

// utils.ts
function embaralharQuestoes<T>(questoes: T[]): T[] {
    const shuffled = [...questoes];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}