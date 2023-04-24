import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { ROUTES } from '../../constants';

import styles from './header.module.scss';

const Header = () => {
	const name = localStorage.getItem('userName');
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const location = useLocation();
	const urlSlug = location.pathname;
	let showControls: boolean;

	urlSlug === '/login' || urlSlug === '/registration'
		? (showControls = false)
		: (showControls = true);

	const logOutHandler = useCallback(() => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		navigate(ROUTES.LOGIN);
	}, [navigate]);

	return (
		<header className={styles.header}>
			<NavLink to='courses' className={styles.header__logo}>
				<Logo />
			</NavLink>
			<div className={styles.header__content}>
				{name && token && showControls && (
					<p className={styles['header__user-name']}>{name}</p>
				)}
				{showControls && (
					<Button onClick={logOutHandler}>{name ? 'Logout' : 'Login'}</Button>
				)}
			</div>
		</header>
	);
};

export default Header;
