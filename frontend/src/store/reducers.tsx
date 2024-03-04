import {userDataType, userStoreActions} from '../types/types';
import { Action } from 'redux';


export const updateStore = (state: userDataType, action : Action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return state ;
    case DEC_COUNT:
      return state;
    case RESTART:
      return 0;
    case ADD_SOME_VALUE:
      return state + action.payload;
    default:
      return state;
  }
};
