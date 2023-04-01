import styles from '../Input/input.module.scss';

type TextAreaProps = {
	id: string;
	type?: string;
	label?: string;
	textarea?: string | boolean;
	name?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	addclass?: string;
	children?: React.ReactNode;
	required?: boolean;
	rows?: number;
	cols?: number;
	hasError?: boolean;
	errorText?: string;
	onBlur?: () => void;
};

const Textarea: React.FC<TextAreaProps> = (props) => {
	const {
		id,
		label,
		name,
		value,
		onChange,
		addclass,
		children,
		required,
		cols,
		rows,
		hasError,
		errorText,
		onBlur,
	} = props;
	return (
		<div className={`${styles.group} ${addclass}`}>
			<textarea
				className={`${styles['form-input']} ${
					hasError && styles['form-input--error']
				}`}
				id={id}
				name={name}
				value={value.toString()}
				onChange={onChange}
				required={required}
				cols={cols}
				rows={rows}
				onBlur={onBlur}
			>
				{children}
			</textarea>
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

export default Textarea;
