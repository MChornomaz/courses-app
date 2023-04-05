import styles from './button.module.scss';

type ButtonProps = {
	children: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	invert?: boolean | null;
	onClick?: () => void | ((a: string) => void);
};

const Button: React.FC<ButtonProps> = ({ children, type, invert, onClick }) => {
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
