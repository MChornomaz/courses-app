import { GET_CURRENT_USER_URL, LOG_OUT_URL } from '../../constants';
import { logInUserAPI } from '../../services';
import { AppThunk, User } from '../../types/types';
import {
	logInUserAction,
	logOutUserAction,
	setUserErrorAction,
	setUserIsLoadingAction,
} from './actionCreators';
import { UserLoginPayload } from './actionTypes';

export const logInUserThunk = (data: User): AppThunk => {
	return async (dispatch) => {
		dispatch(setUserIsLoadingAction());
		const user = await logInUserAPI(data);
		const token = user.result;
		const response = await fetch(GET_CURRENT_USER_URL, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		});
		const result = await response.json();
		if (result.successful) {
			localStorage.setItem('role', result.result.role);
			const loggedUser: UserLoginPayload = {
				name: result.result.name,
				email: result.result.email,
				role: result.result.role,
				token,
			};
			dispatch(logInUserAction(loggedUser));
		} else {
			dispatch(setUserErrorAction('Fetching user failed'));
		}
	};
};

export const logOutThunk = (token: string): AppThunk => {
	return async (dispatch) => {
		dispatch(setUserIsLoadingAction());
		const response = await fetch(LOG_OUT_URL, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});

		if (response.ok) {
			dispatch(logOutUserAction());
			localStorage.removeItem('email');
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			localStorage.removeItem('userName');
		} else {
			dispatch(setUserErrorAction('Log out user failed'));
		}
	};
};
