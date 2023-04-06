import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootState } from '../store';

export type Course = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type Author = {
	id: string;
	name: string;
};

export type User = {
	email: string;
	password: string;
	name?: string;
};

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	AppDispatch,
	AnyAction
>;
