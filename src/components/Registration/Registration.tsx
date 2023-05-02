import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import useHttp from '../../hooks/use-http';
import { createUser } from './../../services';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import { User } from '../../types/types';
import useInput from '../../hooks/use-input';

import styles from './Registration.module.scss';

const Registration = () => {
	const { sendRequest, status, error } = useHttp(createUser, false);
	const {
		value: userName,
		isValid: userNameIsValid,
		hasError: userNameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: userNameInputBlurHandler,
		reset: resetUserName,
	} = useInput((value) => value.length >= 3);

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
	if (userNameIsValid && userEmailIsValid && userPasswordIsValid) {
		formIsValid = true;
	}

	const submitHandler = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();

			if (formIsValid) {
				const newUser: User = {
					name: userName,
					email: userEmail,
					password: userPassword,
				};
				const response = await sendRequest(
					'http://localhost:4000/register',
					newUser
				);
				if (response.successful) {
					resetUserName();
					resetUserEmail();
					resetUserPassword();
					navigate(ROUTES.LOGIN);
				} else if (!response.successful) {
					if (response.errors) alert(response.errors);
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
			resetUserName,
			sendRequest,
			userEmail,
			userPassword,
			userName,
		]
	);

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.heading}>Registration</h2>
			{status === 'pending' && <Spinner />}
			<form onSubmit={submitHandler} className={styles['registration-form']}>
				<Input
					id='name'
					type='text'
					label='Name'
					name='user-name'
					value={userName}
					onChange={nameChangeHandler}
					autocomplete='username nickname'
					hasError={userNameHasError}
					onBlur={userNameInputBlurHandler}
					errorText='User name must have at least 3 characters'
				/>
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
				<Button type='submit'>Registration</Button>
				<p className={styles.login}>
					If you have an account you can <NavLink to='/login'>Login</NavLink>
				</p>
			</form>
		</div>
	);
};

export default Registration;
