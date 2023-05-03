import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants';

export type PrivateRouteProps = {
	userRole: string | null;
	redirectPath: string;
};

const PrivateRoute = ({
	userRole,
	redirectPath = ROUTES.COURSES,
}: PrivateRouteProps) => {
	if (userRole !== 'admin') {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
