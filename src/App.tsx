import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

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
			navigate('/courses');
		} else {
			navigate('/login');
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='body-wrapper'>
			<Header />
			<Routes>
				{isLoggedIn && (
					<Route path='/' element={<Navigate replace to='/courses' />} />
				)}
				{isLoggedIn && <Route path='/courses/*' element={<Courses />} />}
				{isLoggedIn && (
					<Route path={'/courses/add'} element={<CreateCourse />} />
				)}
				{isLoggedIn && (
					<Route path='/courses/:courseId' element={<CourseInfo />} />
				)}
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
