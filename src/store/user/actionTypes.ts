export enum UserActionTypes {
	LOG_IN_USER = 'LOG_IN_USER',
	LOG_OUT_USER = 'LOG_OUT_USER',
}

export type UserLoginPayload = {
	name: string;
	email: string;
	token: string;
};

type LogInUserAction = {
	type: UserActionTypes.LOG_IN_USER;
	payload: UserLoginPayload;
};

type LogOutUserAction = {
	type: UserActionTypes.LOG_OUT_USER;
};

export type UserActions = LogInUserAction | LogOutUserAction;
