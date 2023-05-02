import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants';

export type PrivateRouteProps = {
	user: string | null;
	redirectPath: string;
};

const PrivateRoute = ({
	user,
	redirectPath = ROUTES.COURSES,
}: PrivateRouteProps) => {
	if (user !== 'admin') {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
