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

function App() {
	const navigate = useNavigate();
	const name = localStorage.getItem('userName');
	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const user = useTypedSelector(getUser);
	const isLoggedIn = user.isAuth;

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
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, [isLoggedIn, navigate]);

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
				<Route path='*' element={isLoggedIn ? <Courses /> : <Login />} />
			</Routes>
		</div>
	);
}

export default App;
