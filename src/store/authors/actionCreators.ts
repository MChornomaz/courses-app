import { Author } from '../../types/types';
import { AuthorsActions, AuthorsActionTypes } from './actionTypes';

export const loadAuthors = (): AuthorsActions => ({
	type: AuthorsActionTypes.AUTHORS_LOADING,
});

export const setAuthorsError = (payload: string): AuthorsActions => ({
	type: AuthorsActionTypes.AUTHORS_FETCH_ERROR,
	payload,
});

export const getAuthors = (payload: Author[]): AuthorsActions => ({
	type: AuthorsActionTypes.GET_AUTHORS,
	payload,
});

export const addAuthor = (payload: Author): AuthorsActions => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload,
});
