import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
export const setActiveTestId = createAction<number>('user/setActiveTest');
export const setTestCurrentQuestion = createAction<number>('test/setActiveQuestion');
