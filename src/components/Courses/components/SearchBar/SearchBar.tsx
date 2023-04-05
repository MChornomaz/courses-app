import { useState, ChangeEvent, FormEvent, useCallback } from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import styles from './searchBar.module.scss';

type SearchBarProps = {
	onSearch: (text: string) => void;
	clearSearch: (a: boolean) => void;
};

const SearchBar = (props: SearchBarProps) => {
	const [searchString, setSearchString] = useState('');

	const { clearSearch, onSearch } = props;

	const onInputChangeHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			setSearchString(event.target.value);
			if (event.target.value.trim().length <= 1) {
				clearSearch(true);
			}
		},
		[clearSearch]
	);

	const submitHandler = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			onSearch(searchString);
			if (searchString.trim().length > 0) {
				clearSearch(false);
			} else {
				clearSearch(true);
			}
		},
		[clearSearch, onSearch, searchString]
	);
	return (
		<form onSubmit={submitHandler} className={styles.content}>
			<div className={styles['search-block']}>
				<Input
					type='search'
					id='search-bar'
					label='Enter course name or id...'
					value={searchString}
					onChange={onInputChangeHandler}
				/>
			</div>
			<Button type='submit'>Search</Button>
		</form>
	);
};

export default SearchBar;
