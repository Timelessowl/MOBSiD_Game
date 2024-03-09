import {Question, QuestionArtist, QuestionGenre, UserArtistQuestionAnswer, UserGenreQuestionAnswer, UserAnswer} from './types/question';

export const isArtistAnswerCorrect = (question: QuestionArtist, userAnswer: UserArtistQuestionAnswer): boolean =>
  userAnswer === question.song.artist;

export const isGenreAnswerCorrect = (question: QuestionGenre, userAnswer: UserGenreQuestionAnswer): boolean =>
  userAnswer.every((answer, index) =>
    answer === (question.answers[index].genre === question.genre));

export const isAnswerCorrect = (question: Question, answer: UserAnswer): boolean => false;
// {
// if (question.type === GameType.Artist && typeof answer === 'string') {
//   return isArtistAnswerCorrect(question, answer);
// }
//
// if (question.type === GameType.Genre && Array.isArray(answer)) {
//   return isGenreAnswerCorrect(question, answer);
// }

//   return false;
// };