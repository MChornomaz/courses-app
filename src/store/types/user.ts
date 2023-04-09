export type User = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
	isLoading: boolean;
	hasError: null | string;
};
