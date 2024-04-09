import {Question} from './types/question';


export const isAnswerCorrect = (question: Question, userAnswer: string): boolean =>
  question.answer === userAnswer;

