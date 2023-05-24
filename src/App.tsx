import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Page404 from './common/Page404/Page404';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { UserLoginPayload } from './store/user/actionTypes';
import { logInUserAction } from './store/user/actionCreators';
import { getUser } from './store/selectors';
import { ROUTES } from './constants';

function App() {
	const navigate = useNavigate();
	const name = localStorage.getItem('userName');
	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const role = localStorage.getItem('role');
	const user = useTypedSelector(getUser);
	const isLoggedIn = user ? user.isAuth : false;

	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (name && email && token && role) {
			const loggedUser: UserLoginPayload = {
				name,
				email,
				token,
				role,
			};
			dispatch(logInUserAction(loggedUser));
		}
	}, [dispatch, name, email, token, role]);

	useEffect(() => {
		if (isLoggedIn) {
			navigate(ROUTES.COURSES);
		} else {
			navigate(ROUTES.LOGIN);
		}
	}, [isLoggedIn]);

	return (
		<div className='body-wrapper'>
			<Header />
			<Routes>
				{isLoggedIn && (
					<Route
						path='/'
						element={<Navigate replace to={`${ROUTES.COURSES}`} />}
					/>
				)}
				{isLoggedIn && (
					<Route path={`${ROUTES.COURSES}/*`} element={<Courses />} />
				)}
				{isLoggedIn && (
					<Route
						element={
							<PrivateRoute userRole={role} redirectPath={ROUTES.COURSES} />
						}
					>
						<Route path={ROUTES.ADD_COURSE} element={<CourseForm />} />
					</Route>
				)}

				{isLoggedIn && (
					<Route
						path={`${ROUTES.COURSES}/:courseId`}
						element={<CourseInfo />}
					/>
				)}
				{isLoggedIn && (
					<Route
						path={`${ROUTES.UPDATE_COURSE}/:courseId`}
						element={<CourseForm />}
					/>
				)}
				<Route path={ROUTES.REGISTRATION} element={<Registration />} />
				<Route path={ROUTES.LOGIN} element={<Login />} />
				<Route path='*' element={isLoggedIn ? <Page404 /> : <Login />} />
			</Routes>
		</div>
	);
}

export default App;
