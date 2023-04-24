import { User } from '../types/types';

const createUser = async (url: string, data: User) => {
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
	} catch (e) {
		console.log(e);
	}
};

export default createUser;
