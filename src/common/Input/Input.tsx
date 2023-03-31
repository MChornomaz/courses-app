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
};

const Input: React.FC<InputProps> = (props) => {
	const { id, type, label, name, value, onChange, addclass, required } = props;

	return (
		<div className={`${styles.group} ${addclass}`}>
			<input
				className={styles['form-input']}
				id={id}
				name={name}
				value={value.toString()}
				onChange={onChange}
				required={required}
				type={type}
			/>

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

export default Input;
