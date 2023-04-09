export enum UserActionTypes {
	LOG_IN_USER = 'LOG_IN_USER',
	LOG_OUT_USER = 'LOG_OUT_USER',
	USER_IS_LOADING = 'USER_IS_LOADING',
	USER_HAS_ERROR = 'USER_HAS_ERROR',
}

export type UserLoginPayload = {
	name: string;
	email: string;
	token: string;
	role: string;
};

type LogInUserAction = {
	type: UserActionTypes.LOG_IN_USER;
	payload: UserLoginPayload;
};

type UserIsLoadingAction = {
	type: UserActionTypes.USER_IS_LOADING;
};

type UserHasError = {
	type: UserActionTypes.USER_HAS_ERROR;
	payload: string;
};

type LogOutUserAction = {
	type: UserActionTypes.LOG_OUT_USER;
};

export type UserActions =
	| LogInUserAction
	| LogOutUserAction
	| UserIsLoadingAction
	| UserHasError;
