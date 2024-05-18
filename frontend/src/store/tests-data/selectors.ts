/* eslint-disable */
import { NameSpace } from "../../const";
import { State, TestData } from "../../types/state";

export const getTestLoading = (state: Pick<State, NameSpace.Test>): boolean =>
  state[NameSpace.Test].loading;
export const getPath = (state: Pick<State, NameSpace.Test>): string =>
  state[NameSpace.Test].path;
export const getBackground = (state: Pick<State, NameSpace.Test>): string =>
  state[NameSpace.Test].background as string;
export const getTimer = (state: Pick<State, NameSpace.Test>): string =>
  state[NameSpace.Test].timer;
export const getAllTests = (state: Pick<State, NameSpace.Test>): TestData[] =>
  state[NameSpace.Test].allTest;
