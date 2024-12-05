import React from "react";
import "./QuestionCard.css";

interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | undefined;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer }) => {
  return (
    <div className="quiz-container">
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answer-buttons">
        {answers.map((answer) => (
          <button
            key={answer}
            className="answer-button"
            disabled={!!userAnswer}
            value={answer}
            onClick={callback}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
