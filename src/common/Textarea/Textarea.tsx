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
	} = props;
	return (
		<div className={`${styles.group} ${addclass}`}>
			<textarea
				className={styles['form-input']}
				id={id}
				name={name}
				value={value.toString()}
				onChange={onChange}
				required={required}
				cols={cols}
				rows={rows}
			>
				{children}
			</textarea>
			{label && (
				<label
					htmlFor={id}
					className={`${
						props.value && props.value.length ? styles.shrink : ''
					} ${styles['form-input-label']}`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default Textarea;
