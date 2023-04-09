import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { UserLoginPayload } from './store/user/actionTypes';
import { logInUserAction } from './store/user/actionCreators';
import { getUser } from './store/selectors';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
	const navigate = useNavigate();
	const name = localStorage.getItem('userName');
	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const role = localStorage.getItem('role');
	const user = useTypedSelector(getUser);
	const isLoggedIn = user.isAuth;

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
			navigate('/courses');
		} else {
			navigate('/login');
		}
		// eslint-disable-next-line
	}, [isLoggedIn]);

	return (
		<div className='body-wrapper'>
			<Header />
			<Routes>
				{isLoggedIn && (
					<Route path='/' element={<Navigate replace to='/courses' />} />
				)}
				{isLoggedIn && <Route path='/courses/*' element={<Courses />} />}
				{isLoggedIn && (
					<Route element={<PrivateRoute user={role} redirectPath='/courses' />}>
						<Route path={'/courses/add'} element={<CourseForm />} />
					</Route>
				)}

				{isLoggedIn && (
					<Route path='/courses/:courseId' element={<CourseInfo />} />
				)}
				{isLoggedIn && (
					<Route path='/courses/update/:courseId' element={<CourseForm />} />
				)}
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='*' element={isLoggedIn ? <Courses /> : <Login />} />
			</Routes>
		</div>
	);
}

export default App;
