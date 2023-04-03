import { UserActions, UserActionTypes, UserLoginPayload } from './actionTypes';

export const logInUser = (payload: UserLoginPayload) => ({
	type: UserActionTypes.LOG_IN_USER,
	payload,
});

export const logOutUser = (): UserActions => ({
	type: UserActionTypes.LOG_OUT_USER,
});
