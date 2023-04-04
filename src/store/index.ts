import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authorReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';

import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
