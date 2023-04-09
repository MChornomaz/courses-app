import { Navigate, Outlet } from 'react-router-dom';

export type PrivateRouteProps = {
	user: string | null;
	redirectPath: string;
};

const PrivateRoute = ({
	user,
	redirectPath = '/courses',
}: PrivateRouteProps) => {
	if (user !== 'admin') {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
