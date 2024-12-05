import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./components/api";
import { Question } from "./components/Quesion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizOver, setQuizOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setQuizOver(false);

    const newQuestions = await fetchQuizQuestions(10, "easy");
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setCurrentQuestion(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedAnswer = e.currentTarget.value;
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;

    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [...prev, selectedAnswer]);
  };

  const nextQuestion = () => {
    const next = currentQuestion + 1;

    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setQuizOver(true);
    }
  };

  const endQuiz = () => {
    setQuizOver(true);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      {quizOver ? (
        <>
          <button onClick={startQuiz}>Start Quiz</button>
          {score > 0 && (
            <div className="progress-bar">
              <CircularProgressbar
                value={(score / questions.length) * 100}
                text={`${score}/${questions.length}`}
                styles={buildStyles({
                  pathColor: "#007bff",
                  textColor: "#333",
                  trailColor: "#f0f0f0",
                })}
              />
            </div>
          )}
        </>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Score: {score}</p>
          <QuestionCard
            question={questions[currentQuestion].question}
            answers={questions[currentQuestion].answers}
            callback={checkAnswer}
            userAnswer={userAnswers[currentQuestion]}
          />
          <div className="quiz-actions">
            <button onClick={nextQuestion} disabled={userAnswers.length !== currentQuestion + 1}>
              Next Question
            </button>
            <button onClick={endQuiz}>End Quiz</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
