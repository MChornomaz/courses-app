import styles from './button.module.scss';

type ButtonProps = {
	children: string | React.ReactNode;
	type?: 'button' | 'submit' | 'reset' | undefined;
	invert?: boolean | null;
	onClick?: () => void | ((a: string) => void);
	testid?: string;
};

const Button: React.FC<ButtonProps> = ({
	children,
	type,
	invert,
	onClick,
	testid,
}) => {
	return (
		<button
			className={`${styles.btn} ${invert && styles.invert}`}
			onClick={onClick}
			type={type}
			data-testid={testid}
		>
			{children}
		</button>
	);
};

export default Button;
