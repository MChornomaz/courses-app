import { User } from '../types/user';
import { UserActions, UserActionTypes } from './actionTypes';

const userInitialState: User = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	isLoading: false,
	hasError: null,
};

export const userReducer = (
	state: User = userInitialState,
	action: UserActions
): User => {
	switch (action.type) {
		case UserActionTypes.USER_IS_LOADING:
			return { ...state, isLoading: true };
		case UserActionTypes.LOG_IN_USER:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
				role: action.payload.role,
				isLoading: false,
			};
		case UserActionTypes.LOG_OUT_USER:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
				isLoading: false,
			};
		case UserActionTypes.USER_HAS_ERROR:
			return { ...state, isLoading: false, hasError: action.payload };
		default:
			return state;
	}
};
