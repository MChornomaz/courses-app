import { User } from './types/types';

export const createUser = async (url: string, data: User) => {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	return result;
};

export const logInUserAPI = async (url: string, data: User) => {
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
};
