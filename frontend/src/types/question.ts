import {GameData} from './state';

export type Question = {
  testId : number,
  id: number;
  text: string;
  withOptions: boolean;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  opt5: string;
  answer: string;
};

export type Questions = Question[];
export type Tests = GameData[];

export type CurrentQuestion = {
  testId: number;
  questionId: number;
  isAnswered: boolean;
  allowedAttempts: number;
  currAttempt: number;
  quesText: string;
  userAnswer: string;
}

export type CheckAnsData = {
  questionId: number;
  userAnswer: string;
}

