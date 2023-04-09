import {
	useState,
	FormEvent,
	ChangeEvent,
	useCallback,
	useEffect,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import pipeDuration from '../../helpers/pipeDuration';
import useInput from '../../hooks/use-input';

import { Author } from '../../types/types';
import { CourseApi } from '../../store/types/course';
import { AuthorApiBody } from '../../store/types/author';

import { NO_AUTHORS_FOUND } from '../../constants';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { getAllAuthors, getAllCourses } from '../../store/selectors';
import { getUser } from './../../store/selectors';
import { addNewCourse, updateCourse } from '../../store/courses/thunk';
import { addNewAuthor } from '../../store/authors/thunk';

import styles from './courseForm.module.scss';

const CourseForm = () => {
	const { authors: authorsArray } = useTypedSelector(getAllAuthors);
	const [authors, setAuthors] = useState<Author[]>(authorsArray);
	const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
	const [durationInHours, setDurationInHours] = useState('00:00');

	const navigate = useNavigate();
	const dispatch = useTypedDispatch();
	const { token } = useTypedSelector(getUser);

	const onCancel = useCallback(() => navigate('/courses'), [navigate]);

	useEffect(() => {
		setAuthors(authorsArray);
	}, [authorsArray]);

	const {
		value: title,
		setEnteredValue: setTitle,
		isValid: titleIsValid,
		hasError: titleHasError,
		valueChangeHandler: titleChangeHandler,
		inputBlurHandler: titleInputBlurHandler,
		reset: resetTitle,
	} = useInput((value) => value.length >= 3);

	const {
		value: description,
		setEnteredValue: setDescription,
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
		setEnteredValue: setDuration,
		isValid: durationIsValid,
		hasError: durationHasError,
		valueChangeHandler: onDurationChangeHandler,
		inputBlurHandler: durationBlurHandler,
		reset: resetDuration,
	} = useInput((value) => +value > 0);

	const courseId = useParams().courseId;
	const { courses } = useTypedSelector(getAllCourses);

	useEffect(() => {
		if (courseId) {
			const course = courses.filter((course) => course.id === courseId)[0];
			const filteredAuthors = course.authors.map((el) =>
				authors.filter((item) => item.id === el)
			);
			const courseAuthors = filteredAuthors.flat();
			setTitle(course.title);
			setDescription(course.description);
			setDuration(course.duration.toLocaleString());
			setSelectedAuthors(courseAuthors);
		}
		// eslint-disable-next-line
	}, [courses, courseId]);

	const createAuthorHandler = useCallback(() => {
		const createdAuthor: AuthorApiBody = {
			name: newAuthor,
		};

		if (newAuthorIsValid) {
			dispatch(addNewAuthor(createdAuthor, token) as any);
			setAuthors(authorsArray);
			resetNewAuthor();
		} else {
			alert('Authors name must be longer than 2 characters');
		}
	}, [
		newAuthor,
		newAuthorIsValid,
		resetNewAuthor,
		dispatch,
		token,
		authorsArray,
	]);

	const durationChangeHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onDurationChangeHandler(event);
			setDurationInHours(pipeDuration(parseInt(event.target.value)));
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

	const createCourseHandler = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
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
				const newCourse: CourseApi = {
					title: title,
					description: description,
					duration: parseInt(duration),
					authors: authorsList,
				};

				if (!courseId) {
					dispatch(addNewCourse(newCourse, token) as any);
				} else {
					dispatch(updateCourse(newCourse, token, courseId) as any);
				}

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
			token,
			courseId,
		]
	);

	return (
		<div className='wrapper'>
			<form
				onSubmit={createCourseHandler}
				className={styles['course-form']}
				data-testid='course-form'
			>
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
						{!courseId && <Button type='submit'>Create course</Button>}
						{courseId && <Button type='submit'>Update course</Button>}
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

export default CourseForm;
