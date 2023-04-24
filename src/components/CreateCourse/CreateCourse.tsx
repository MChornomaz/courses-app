import { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGeneratop';
import { Course, Author } from '../../types/types';
import useInput from '../../hooks/use-input';

import { NO_AUTHORS_FOUND } from '../../constants';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getAllAuthors } from './../../store/selectors';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { addAuthor } from '../../store/authors/actionCreators';
import { addCourse } from '../../store/courses/actionCreators';

import styles from './createCourse.module.scss';

const CreateCourse = () => {
	const authorsState = useTypedSelector(getAllAuthors);

	const [authors, setAuthors] = useState<Author[]>(authorsState.authors);
	const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
	const [durationInHours, setDurationInHours] = useState('00:00');

	const navigate = useNavigate();
	const dispatch = useTypedDispatch();

	const onCancel = useCallback(() => navigate('/courses'), [navigate]);

	const {
		value: title,
		isValid: titleIsValid,
		hasError: titleHasError,
		valueChangeHandler: titleChangeHandler,
		inputBlurHandler: titleInputBlurHandler,
		reset: resetTitle,
	} = useInput((value) => value.length >= 3);

	const {
		value: description,
		isValid: descriptionIsValid,
		hasError: descriptionHasError,
		valueChangeHandler: descriptionChangeHandler,
		inputBlurHandler: descriptionBlurHandler,
		reset: resetDescription,
	} = useInput((value) => value.length >= 3);

	const {
		value: newAuthor,
		isValid: newAuthorIsValid,
		hasError: newAuthorHasError,
		valueChangeHandler: onAuthorNameChangeHandler,
		inputBlurHandler: newAuthorBlurHandler,
		reset: resetNewAuthor,
	} = useInput((value) => value.length >= 3);

	const {
		value: duration,
		isValid: durationIsValid,
		hasError: durationHasError,
		valueChangeHandler: onDurationChangeHandler,
		inputBlurHandler: durationBlurHandler,
		reset: resetDuration,
	} = useInput((value) => +value > 0);

	const createAuthorHandler = useCallback(() => {
		const createdAuthor: Author = {
			id: v4(),
			name: newAuthor,
		};

		if (newAuthorIsValid) {
			dispatch(addAuthor(createdAuthor));
			setAuthors((prevState) => [...prevState, createdAuthor]);
			resetNewAuthor();
		} else {
			alert('Authors name must be longer than 2 characters');
		}
	}, [newAuthor, newAuthorIsValid, resetNewAuthor, dispatch]);

	const durationChangeHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onDurationChangeHandler(event);
			setDurationInHours(pipeDuration(parseInt(event.target.value, 10)));
		},
		[onDurationChangeHandler]
	);

	const selectedAuthorHandler = useCallback(
		(id: string): void => {
			const selectedAuthor = authors.filter((author) => author.id === id);
			setAuthors(authors.filter((author) => author.id !== id));
			setSelectedAuthors((prevState) => [...prevState, ...selectedAuthor]);
		},
		[authors]
	);

	const removeAuthorHandler = useCallback(
		(id: string): void => {
			const selectedAuthor = selectedAuthors.filter(
				(author) => author.id === id
			);
			setAuthors((prevState) => [...prevState, ...selectedAuthor]);
			setSelectedAuthors(selectedAuthors.filter((author) => author.id !== id));
		},
		[selectedAuthors]
	);

	let formIsValid = false;
	if (titleIsValid && descriptionIsValid && durationIsValid) {
		formIsValid = true;
	}

	const formSubmitHandler = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			const date = dateGenerator(new Date());
			const authorsList = selectedAuthors.map((author) => author.id);
			if (!formIsValid || authorsList.length === 0) {
				alert('Please, fill in all fields');
				if (titleHasError) {
					alert('Title must have at least 3 characters');
				}
				if (descriptionHasError) {
					alert('Description must have at least 3 characters');
				}
				if (durationHasError) {
					alert('Enter valid duration (greater than 0)');
				}
				if (authorsList.length === 0) {
					alert('You have to add author to course');
				}
			} else {
				const newCourse: Course = {
					id: v4(),
					title,
					description,
					creationDate: date,
					duration: +duration,
					authors: authorsList,
				};
				dispatch(addCourse(newCourse));
				resetTitle();
				resetDescription();
				resetDuration();
				resetNewAuthor();
				navigate('/courses');
			}
		},
		[
			description,
			descriptionHasError,
			duration,
			durationHasError,
			formIsValid,
			resetDescription,
			resetDuration,
			resetNewAuthor,
			resetTitle,
			selectedAuthors,
			title,
			titleHasError,
			navigate,
			dispatch,
		]
	);

	return (
		<div className='wrapper'>
			<form onSubmit={formSubmitHandler} className={styles['course-form']}>
				<div className={styles['course-form__header']}>
					<Input
						type='text'
						id='course-title'
						name='title'
						label='Title'
						value={title}
						onChange={titleChangeHandler}
						addclass={styles['course-form__title-block']}
						onBlur={titleInputBlurHandler}
						hasError={titleHasError}
						errorText='Title must have at least 3 characters'
						required
					/>
					<div className={styles['course-form__buttons']}>
						<Button type='submit'>Create course</Button>
						<Button onClick={onCancel} invert={true} type='button'>
							Cancel
						</Button>
					</div>
				</div>
				<Textarea
					textarea='true'
					label='Description'
					id='description'
					onChange={descriptionChangeHandler}
					value={description}
					rows={5}
					onBlur={descriptionBlurHandler}
					hasError={descriptionHasError}
					errorText='Description must have at least 3 characters'
					required
				></Textarea>
				<div className={styles['course-form__authors']}>
					<div className={styles['course-form__left-block']}>
						<h3 className={styles.heading}>Add author</h3>
						<div className={styles['course-form__add-author']}>
							<Input
								type='text'
								id='author-name'
								label='Author name'
								value={newAuthor}
								onChange={onAuthorNameChangeHandler}
								min={2}
								onBlur={newAuthorBlurHandler}
								hasError={newAuthorHasError}
								errorText='Author name must have at least 3 characters'
							/>
							<Button type='button' onClick={createAuthorHandler}>
								Create author
							</Button>
						</div>
					</div>
					<div className={styles['course-form__right-block']}>
						<div className={styles['course-form__authors__block']}>
							<h3 className={styles.heading}>Authors</h3>
							<ul className={styles['course-form__choose-authors']}>
								{authors &&
									authors.map((author) => (
										<li
											className={styles['course-form__author']}
											key={author.id}
										>
											<p>{author.name}</p>
											<Button onClick={() => selectedAuthorHandler(author.id)}>
												Add author
											</Button>
										</li>
									))}
								{authors.length === 0 && (
									<p className={styles['course-form__empty']}>
										{NO_AUTHORS_FOUND}
									</p>
								)}
							</ul>
						</div>
					</div>
					<div className={styles['course-form__left-block']}>
						<div className={styles['course-form__duration-block']}>
							<h3 className={styles.heading}>Duration</h3>
							<Input
								type='number'
								step={1}
								id='duration'
								label='Duration'
								value={duration ? duration.toString() : ''}
								onChange={durationChangeHandler}
								onBlur={durationBlurHandler}
								hasError={durationHasError}
								errorText='Enter valid duration (greater than 0)'
								required
							/>
							<p className={styles['course-form__duration']}>
								Duration:{' '}
								<span className={styles['course-form__duration-time']}>
									{durationInHours}
								</span>{' '}
								hours
							</p>
						</div>
					</div>
					<div className={styles['course-form__right-block']}>
						<h3 className={styles.heading}>Course authors</h3>
						<ul className={styles['course-form__choose-authors']}>
							{selectedAuthors &&
								selectedAuthors.map((author) => (
									<li
										className={styles['course-form__author']}
										key={author.name}
									>
										<p>{author.name}</p>
										<Button onClick={() => removeAuthorHandler(author.id)}>
											Remove author
										</Button>
									</li>
								))}
							{selectedAuthors.length === 0 && (
								<p className={styles['course-form__empty']}>
									{NO_AUTHORS_FOUND}
								</p>
							)}
						</ul>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateCourse;
