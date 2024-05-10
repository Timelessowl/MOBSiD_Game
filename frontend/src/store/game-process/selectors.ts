/* eslint-disable */
import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getProgress = (state: Pick<State, NameSpace.Game>): string => state[NameSpace.Game].progress;
export const getPosition = (state: Pick<State, NameSpace.Game>): string => state[NameSpace.Game].positions;
export const getProgressLoading = (state: Pick<State, NameSpace.Game>): boolean => state[NameSpace.Game].loading;
