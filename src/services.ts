import { GET_AUTHORS_URL, GET_COURSES_URL } from './constants';
import { User } from './types/types';

export const createUser = async (url: string, data: User) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	} catch (e: unknown) {
		throw new Error(typeof e === 'string' ? e : 'Creating user failed!');
	}
};

export const logInUserAPI = async (url: string, data: User) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();

		if (result.successful) {
			const token = result.result;
			const userName = result.user.name;
			const email = result.user.email;

			localStorage.setItem('token', token);
			localStorage.setItem('userName', userName);
			localStorage.setItem('email', email);
		}

		return result;
	} catch (e: unknown) {
		throw new Error(
			typeof e === 'string' ? e : 'Log in failed! Check your credentials'
		);
	}
};

export const fetchAllAuthors = async () => {
	const response = await fetch(GET_AUTHORS_URL, { method: 'GET' });
	const result = await response.json();

	if (result.successful) {
		return result.result;
	} else {
		throw new Error('Authors fetch failed');
	}
};

export const fetchAllCourses = async () => {
	const response = await fetch(GET_COURSES_URL, { method: 'GET' });
	const result = await response.json();

	if (result.successful) {
		return result.result;
	} else {
		throw new Error('Courses fetch failed');
	}
};
