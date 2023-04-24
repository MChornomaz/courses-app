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
