import { useState, FormEvent, ChangeEvent } from 'react';
import { v4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGeneratop';
import { Course, Author } from '../../types/types';

import {
	mockedAuthorsList,
	mockedCoursesList,
	NO_AUTHORS_FOUND,
} from '../../constants';

import styles from './createCourse.module.scss';
import Textarea from '../../common/Textarea/Textarea';

type CreateCourseProps = {
	setCreateCourse: (a: boolean) => void;
	onCancel: () => void;
};

const CreateCourse = (props: CreateCourseProps) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
	const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
	const [newAuthor, setNewAuthor] = useState('');
	const [duration, setDuration] = useState<null | number>(null);
	const [durationInHours, setDurationInHours] = useState('00:00');
	const [changed, setChanged] = useState(false);

	const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const descriptionChangeHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(event.target.value);
	};

	const onAuthorNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setNewAuthor(event.target.value);
	};

	const createAuthorHandler = () => {
		const createdAuthor: Author = {
			id: v4(),
			name: newAuthor,
		};
		mockedAuthorsList.push(createdAuthor);
		setChanged(!changed);
		// setAuthors((prevState) => [...prevState, createdAuthor]);
	};

	const durationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setDuration(+event.target.value);
		setDurationInHours(pipeDuration(+event.target.value));
	};

	const selectedAuthorHandler = (id: string): void => {
		const selectedAuthor = authors.filter((author) => author.id === id);
		setAuthors(authors.filter((author) => author.id !== id));
		setSelectedAuthors((prevState) => [...prevState, ...selectedAuthor]);
	};

	const removeAuthorHandler = (id: string): void => {
		const selectedAuthor = selectedAuthors.filter((author) => author.id === id);
		setAuthors((prevState) => [...prevState, ...selectedAuthor]);
		setSelectedAuthors(selectedAuthors.filter((author) => author.id !== id));
	};

	const formSubmitHandler = (event: FormEvent) => {
		event.preventDefault();
		const date = dateGenerator(new Date());
		const authorsList = selectedAuthors.map((author) => author.id);
		if (
			title.length === 0 ||
			description.length < 2 ||
			duration === 0 ||
			duration === null ||
			authorsList.length === 0
		) {
			alert('Please, fill in all fields');
		} else {
			const newCourse: Course = {
				id: v4(),
				title,
				description,
				creationDate: date,
				duration,
				authors: authorsList,
			};
			mockedCoursesList.push(newCourse);
			props.setCreateCourse(false);
		}
	};

	return (
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
					required
				/>
				<div className={styles['course-form__buttons']}>
					<Button type='submit'>Create course</Button>
					<Button onClick={props.onCancel} invert='true' type='button'>
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
									<li className={styles['course-form__author']} key={author.id}>
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
								<li className={styles['course-form__author']} key={author.name}>
									<p>{author.name}</p>
									<Button onClick={() => removeAuthorHandler(author.id)}>
										Remove author
									</Button>
								</li>
							))}
						{selectedAuthors.length === 0 && (
							<p className={styles['course-form__empty']}>{NO_AUTHORS_FOUND}</p>
						)}
					</ul>
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;
