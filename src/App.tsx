import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { UserLoginPayload } from './store/user/actionTypes';
import { logInUser } from './store/user/actionCreators';
import { getUser } from './store/selectors';
import { ROUTES } from './constants';
import Page404 from './components/Page404/Page404';

function App() {
	const navigate = useNavigate();
	const name = localStorage.getItem('userName');
	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const user = useTypedSelector(getUser);
	const isLoggedIn = user ? user.isAuth : false;

	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (name && email && token) {
			const loggedUser: UserLoginPayload = {
				name,
				email,
				token,
			};
			dispatch(logInUser(loggedUser));
		}
	}, [dispatch, name, email, token]);

	useEffect(() => {
		if (isLoggedIn) {
			navigate(ROUTES.COURSES);
		} else {
			navigate(ROUTES.LOGIN);
		}
		// eslint-disable-next-line
	}, [isLoggedIn]);

	return (
		<div className='body-wrapper'>
			<Header />
			<Routes>
				{isLoggedIn && (
					<Route path='/' element={<Navigate replace to={ROUTES.COURSES} />} />
				)}
				{isLoggedIn && (
					<Route path={`${ROUTES.COURSES}/*`} element={<Courses />} />
				)}
				{isLoggedIn && (
					<Route path={ROUTES.ADD_COURSE} element={<CreateCourse />} />
				)}
				{isLoggedIn && (
					<Route
						path={`${ROUTES.COURSES}/:courseId`}
						element={<CourseInfo />}
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
