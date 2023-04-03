import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
	user: userReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
