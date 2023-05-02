import { AuthorState } from '../types/author';
import { AuthorsActions, AuthorsActionTypes } from './actionTypes';

const authorInitialState: AuthorState = {
	authors: [],
	authorsIsLoading: false,
	authorsHasError: null,
};

export const authorReducer = (
	state: AuthorState = authorInitialState,
	action: AuthorsActions
) => {
	switch (action.type) {
		case AuthorsActionTypes.AUTHORS_LOADING:
			return { ...state, authorsIsLoading: true };

		case AuthorsActionTypes.GET_AUTHORS:
			return { ...state, authors: action.payload, authorsIsLoading: false };

		case AuthorsActionTypes.ADD_AUTHOR:
			return {
				...state,
				authors: [...state.authors, action.payload],
				authorsIsLoading: false,
			};

		case AuthorsActionTypes.AUTHORS_FETCH_ERROR:
			return {
				...state,
				authorsIsLoading: false,
				authorsHasError: action.payload,
			};
		default:
			return state;
	}
};
