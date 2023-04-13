import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { ROUTES } from './constants';

function App() {
	const navigate = useNavigate();
	const name = localStorage.getItem('userName');
	const token = localStorage.getItem('token');

	let isLoggedIn: boolean;
	if (name && token) {
		isLoggedIn = true;
	} else {
		isLoggedIn = false;
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate(ROUTES.COURSES);
		} else {
			navigate(ROUTES.LOGIN);
		}
		// eslint-disable-next-line
	}, []);

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
			</Routes>
		</div>
	);
}

export default App;
