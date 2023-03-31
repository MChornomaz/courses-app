import styles from './button.module.scss';

type Props = {
	children: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	invert?: boolean | null | string;
	onClick?: () => void | ((a: string) => void);
};

const Button: React.FC<Props> = ({ children, type, invert, onClick }) => {
	return (
		<button
			className={`${styles.btn} ${invert && styles.invert}`}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};

export default Button;
