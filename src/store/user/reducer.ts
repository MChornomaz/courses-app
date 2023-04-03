import { User } from '../types/user';
import { UserActions, UserActionTypes } from './actionTypes';

const userInitialState: User = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (
	state: User = userInitialState,
	action: UserActions
): User => {
	switch (action.type) {
		case UserActionTypes.LOG_IN_USER:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case UserActionTypes.LOG_OUT_USER:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};
