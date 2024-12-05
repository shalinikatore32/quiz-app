// src/api.ts
import axios from "axios";

export const fetchQuizQuestions = async (amount: number, difficulty: string) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const { data } = await axios.get(endpoint);
  return data.results.map((question: any) => ({
    question: question.question,
    answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
    correctAnswer: question.correct_answer,
  }));
};
