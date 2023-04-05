import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { User } from '../../types/types';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import useInput from '../../hooks/use-input';
import Spinner from '../../common/Spinner/Spinner';

import logInUser from '../../api/login-user';
import useHttp from '../../hooks/use-http';
import styles from './Login.module.scss';

const Login = () => {
	const { sendRequest, status, error } = useHttp(logInUser, false);
	const {
		value: userEmail,
		isValid: userEmailIsValid,
		hasError: userEmailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: userEmailInputBlurHandler,
		reset: resetUserEmail,
	} = useInput((value) => value.includes('@'));

	const {
		value: userPassword,
		isValid: userPasswordIsValid,
		hasError: userPasswordHasError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: userPasswordInputBlurHandler,
		reset: resetUserPassword,
	} = useInput((value) => value.length >= 6);

	const navigate = useNavigate();

	let formIsValid = false;
	if (userEmailIsValid && userPasswordIsValid) {
		formIsValid = true;
	}

	const submitHandler = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();

			if (formIsValid) {
				const user: User = {
					email: userEmail,
					password: userPassword,
				};
				const response = await sendRequest('http://localhost:4000/login', user);
				if (response.successful) {
					resetUserEmail();
					resetUserPassword();
					navigate('/courses');
				} else if (!response.successful) {
					alert(
						'User was not found, please check your credentials and try again'
					);
					if (error) alert(error);
				}
			}
		},
		[
			error,
			formIsValid,
			navigate,
			resetUserEmail,
			resetUserPassword,
			sendRequest,
			userEmail,
			userPassword,
		]
	);

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.heading}>Login</h2>
			{status === 'pending' && <Spinner />}
			<form onSubmit={submitHandler} className={styles['registration-form']}>
				<Input
					id='email'
					type='email'
					label='Email'
					name='email'
					value={userEmail}
					onChange={emailChangeHandler}
					autocomplete='email'
					hasError={userEmailHasError}
					onBlur={userEmailInputBlurHandler}
					errorText='Enter the valid email'
				/>
				<Input
					id='password'
					type='password'
					label='Password'
					name='password'
					value={userPassword}
					onChange={passwordChangeHandler}
					autocomplete='new-password'
					hasError={userPasswordHasError}
					onBlur={userPasswordInputBlurHandler}
					errorText='Password must have at least 6 characters'
				/>
				<Button type='submit'>Log In</Button>
				<p className={styles.login}>
					If you have an account you can{' '}
					<NavLink to='/registration'>Sign Up</NavLink>
				</p>
			</form>
		</div>
	);
};

export default Login;