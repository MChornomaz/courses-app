import { Author } from '../../types/types';

export enum AuthorsActionTypes {
	AUTHORS_LOADING = 'AUTHORS_LOADING',
	AUTHORS_FETCH_ERROR = 'AUTHORS_FETCH_ERROR',
	GET_AUTHORS = 'GET_AUTHORS',
	ADD_AUTHOR = 'ADD_AUTHOR',
}

type AuthorsLoading = {
	type: AuthorsActionTypes.AUTHORS_LOADING;
};

type AuthorsFetchError = {
	type: AuthorsActionTypes.AUTHORS_FETCH_ERROR;
	payload: string;
};

type GetAuthors = {
	type: AuthorsActionTypes.GET_AUTHORS;
	payload: Author[];
};

type AddAuthor = {
	type: AuthorsActionTypes.ADD_AUTHOR;
	payload: Author;
};

export type AuthorsActions =
	| AuthorsLoading
	| AuthorsFetchError
	| GetAuthors
	| AddAuthor;
