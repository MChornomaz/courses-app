import { Author } from '../../types/types';
import { AuthorsActions, AuthorsActionTypes } from './actionTypes';

export const loadAuthorsAction = (): AuthorsActions => ({
	type: AuthorsActionTypes.AUTHORS_LOADING,
});

export const setAuthorsErrorAction = (payload: string): AuthorsActions => ({
	type: AuthorsActionTypes.AUTHORS_FETCH_ERROR,
	payload,
});

export const getAuthorsAction = (payload: Author[]): AuthorsActions => ({
	type: AuthorsActionTypes.GET_AUTHORS,
	payload,
});

export const addAuthorAction = (payload: Author): AuthorsActions => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload,
});
