import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

import styles from './header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header__logo}>
				<Logo />
			</div>
			<div className={styles.header__content}>
				<p className={styles['header__user-name']}>User</p>
				<Button>Logout</Button>
			</div>
		</header>
	);
};

export default Header;
