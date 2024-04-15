/* eslint-disable */
import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getProgress = (state: Pick<State, NameSpace.Game>): string => state[NameSpace.Game].progress;
export const getPosition = (state: Pick<State, NameSpace.Game>): number => state[NameSpace.Game].position;
export const getLoading = (state: Pick<State, NameSpace.Game>): boolean => state[NameSpace.Game].loading;
