import { NavLink, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { ROUTES } from '../../constants';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { getUser } from './../../store/selectors';
import { logOutThunk } from '../../store/user/thunk';

import styles from './header.module.scss';
import { ROUTES } from '../../constants';

const Header = () => {
	const { name, isAuth, token } = useTypedSelector(getUser);
	const dispatch = useTypedDispatch();

	const location = useLocation();
	const urlSlug = location.pathname;
	let showControls: boolean;
	urlSlug === '/login' || urlSlug === '/registration'
		? (showControls = false)
		: (showControls = true);

	const logOutHandler = useCallback(() => {
		dispatch(logOutThunk(token) as any);
	}, [dispatch, token]);

	const shownUserName = name === 'null' ? 'Admin' : name;

	return (
		<header className={styles.header}>
			<NavLink to={ROUTES.COURSES} className={styles.header__logo}>
				<Logo />
			</NavLink>
			<div className={styles.header__content}>
				{isAuth && showControls && (
					<p className={styles['header__user-name']}>{shownUserName}</p>
				)}
				{showControls && (
					<Button onClick={logOutHandler}>{name ? 'Logout' : 'Login'}</Button>
				)}
			</div>
		</header>
	);
};

export default Header;
