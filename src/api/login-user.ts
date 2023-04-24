import { User } from '../types/types';

const logInUser = async (url: string, data: User) => {
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

		localStorage.setItem('token', token);
		localStorage.setItem('userName', userName);
	}

	return result;
};

export default logInUser;
