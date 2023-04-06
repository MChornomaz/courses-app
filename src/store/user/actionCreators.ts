import { UserActions, UserActionTypes, UserLoginPayload } from './actionTypes';

export const logInUserAction = (payload: UserLoginPayload): UserActions => ({
	type: UserActionTypes.LOG_IN_USER,
	payload,
});

export const logOutUserAction = (): UserActions => ({
	type: UserActionTypes.LOG_OUT_USER,
});

export const setUserIsLoadingAction = (): UserActions => ({
	type: UserActionTypes.USER_IS_LOADING,
});

export const setUserErrorAction = (payload: string): UserActions => ({
	type: UserActionTypes.USER_HAS_ERROR,
	payload,
});
