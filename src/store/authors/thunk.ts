import { ADD_AUTHOR_URL } from '../../constants';
import { AppThunk, Author } from '../../types/types';
import { AuthorApiBody } from '../types/author';
import {
	addAuthorAction,
	setAuthorsErrorAction,
	loadAuthorsAction,
} from './actionCreators';

export const addNewAuthor = (data: AuthorApiBody, token: string): AppThunk => {
	return async (dispatch) => {
		dispatch(loadAuthorsAction());

		const response = await fetch(ADD_AUTHOR_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(data),
		});
		const result = await response.json();

		if (result.successful) {
			const newAuthor: Author = {
				id: result.result.id,
				name: result.result.name,
			};
			dispatch(addAuthorAction(newAuthor));
		} else {
			dispatch(setAuthorsErrorAction('Adding author failed'));
		}
	};
};
