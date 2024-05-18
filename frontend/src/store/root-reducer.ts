import { combineReducers } from "@reduxjs/toolkit";
import { NameSpace } from "../const";
import { gameData } from "./game-data/game-data";
import { testData } from "./tests-data/tests-data";
import { gameProcess } from "./game-process/game-process";
import { userProcess } from "./user-process/user-process";

export const rootReducer = combineReducers({
  [NameSpace.Data]: gameData.reducer,
  [NameSpace.Game]: gameProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Test]: testData.reducer,
});
