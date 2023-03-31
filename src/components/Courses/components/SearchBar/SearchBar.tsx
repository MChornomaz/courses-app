import { useState, ChangeEvent, FormEvent } from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import styles from './searchBar.module.scss';

type SearchBarProps = {
	onSearch: (text: string) => void;
	clearSearch: (a: boolean) => void;
};

const SearchBar = (props: SearchBarProps) => {
	const [searchString, setSearchString] = useState('');
	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setSearchString(event.target.value);
		if (event.target.value.trim().length <= 1) {
			props.clearSearch(true);
		}
	};

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		props.onSearch(searchString);
		if (searchString.trim().length > 0) {
			props.clearSearch(false);
		} else {
			props.clearSearch(true);
		}
	};
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
