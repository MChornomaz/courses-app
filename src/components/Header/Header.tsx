import { NavLink, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

import styles from './header.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { logOutUser } from '../../store/user/actionCreators';
import { getUser } from './../../store/selectors';

const Header = () => {
	const { name, isAuth } = useTypedSelector(getUser);
	const dispatch = useTypedDispatch();

	const location = useLocation();
	const urlSlug = location.pathname;
	let showControls: boolean;
	if (urlSlug === '/login' || urlSlug === '/registration') {
		showControls = false;
	} else {
		showControls = true;
	}

	const logOutHandler = useCallback(() => {
		dispatch(logOutUser());
	}, [dispatch]);

	return (
		<header className={styles.header}>
			<NavLink to='courses' className={styles.header__logo}>
				<Logo />
			</NavLink>
			<div className={styles.header__content}>
				{isAuth && showControls && (
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
