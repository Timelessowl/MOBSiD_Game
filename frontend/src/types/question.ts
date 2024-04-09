export type Question = {
  id: number;
  text: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  opt5: string;
  answer: string;
};

export type Questions = Question[];

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
