import { User } from '../store/types/user';

const userIsAdmin = (user: User) => {
	return user.role === 'admin';
};

export default userIsAdmin;
