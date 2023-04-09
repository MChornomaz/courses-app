import { Author } from '../../types/types';

export type AuthorState = {
	authors: Author[];
	authorsIsLoading: boolean;
	authorsHasError: null | string;
};

export type AuthorApiBody = {
	name: string;
};
