import styles from './input.module.scss';

type InputProps = {
	id: string;
	type?: string;
	label?: string;
	name?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addclass?: string;
	required?: boolean;
	min?: number;
	step?: number;
	hasError?: boolean;
	errorText?: string;
	onBlur?: () => void;
};

const Input: React.FC<InputProps> = (props) => {
	const {
		id,
		type,
		label,
		name,
		value,
		onChange,
		addclass,
		required,
		hasError,
		errorText,
		onBlur,
	} = props;

	return (
		<div className={`${styles.group} ${addclass} `}>
			<input
				className={`${styles['form-input']} ${
					hasError && styles['form-input--error']
				}`}
				id={id}
				name={name}
				value={value.toString()}
				onChange={onChange}
				required={required}
				type={type}
				onBlur={onBlur}
			/>

			{label && (
				<label
					htmlFor={id}
					className={`${
						props.value && props.value.length ? styles.shrink : ''
					} ${styles['form-input-label']} ${
						hasError && styles['form-input-label--error']
					}`}
				>
					{label}
				</label>
			)}
			{hasError && <p className={styles.error}>{errorText}</p>}
		</div>
	);
};

export default Input;
