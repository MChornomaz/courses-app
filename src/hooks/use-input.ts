import { useState, useCallback } from 'react';

type ValidateFunction = (value: string) => boolean;

const useInput = (validateValue: ValidateFunction) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setEnteredValue(event.target.value);
		},
		[]
	);

	const inputBlurHandler = useCallback(() => {
		setIsTouched(true);
	}, []);

	const reset = useCallback(() => {
		setEnteredValue('');
		setIsTouched(false);
	}, []);

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
