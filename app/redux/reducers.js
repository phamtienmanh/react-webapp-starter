import { combineReducers } from 'redux-immutable';

import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import signinReducer from './ui/signin/reducer';

export const AppReducer = combineReducers({
  app: appReducer,
});

export const AppDataReducer = combineReducers({
  ...authReducer,
});

export const AppUiReducer = combineReducers({
  ...signinReducer,
});
