/* eslint-disable */
import { NameSpace } from "../../const";
import { State } from "../../types/state";
import { Questions } from "../../types/question";

export const getQuestions = (state: Pick<State, NameSpace.Data>): Questions =>
  state[NameSpace.Data].questions;
export const getQuestionsLoading = (
  state: Pick<State, NameSpace.Data>,
): boolean => state[NameSpace.Data].loading;
export const getCurrentQuestion = (
  state: Pick<State, NameSpace.Data>,
): number => state[NameSpace.Data].currentQuestion;
