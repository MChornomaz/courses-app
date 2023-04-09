import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

import Button from '../../../../common/Button/Button';

import pipeDuration from '../../../../helpers/pipeDuration';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../../../hooks/useTypedDispatch';
import { getAllAuthors } from '../../../../store/selectors';
import { Course, Author } from '../../../../types/types';

import { getUser } from './../../../../store/selectors';
import { deleteCourse } from '../../../../store/courses/thunk';

import styles from './courseCard.module.scss';

type CardProps = {
	cardInfo: Course;
};

const CourseCard: React.FC<CardProps> = ({ cardInfo }) => {
	const { id, title, duration, creationDate, authors } = cardInfo;
	let { description } = cardInfo;
	const userRole = useTypedSelector(getUser).role;
	let { authors: authorsArray } = useTypedSelector(getAllAuthors);
	const { token } = useTypedSelector(getUser);

	const navigate = useNavigate();
	const dispatch = useTypedDispatch();

	const authorArr = useMemo(() => {
		let newAuthorArr: Author[] = [];

		if (authors) {
			authors.forEach((author) => {
				newAuthorArr.push(...authorsArray.filter((el) => el.id === author));
			});
		}
		return newAuthorArr;
	}, [authors, authorsArray]);

	const courseAuthorsArr = authorArr.map((el) => el.name);
	const courseAuthors = courseAuthorsArr.join(', ');
	const courseDuration = pipeDuration(duration);

	const showCourseInfoHandler = useCallback(() => {
		navigate(`/courses/${id}`);
	}, [id, navigate]);

	const deleteCourseHandler = useCallback(() => {
		const courseId = {
			id,
		};
		dispatch(deleteCourse(courseId, token) as any);
	}, [dispatch, id, token]);

	const cutString = useCallback((str: string, number: number) => {
		return str.slice(0, number);
	}, []);

	const updateCourseHandler = useCallback(() => {
		navigate(`/courses/update/${id}`);
	}, [id, navigate]);

	if (description && description.length > 420) {
		description = cutString(description, 420) + '...';
	}

	return (
		<div className={styles.card} data-testid='courses-card'>
			<div className={styles.card__description}>
				<h3 data-testid='card-title' className={styles.card__title}>
					{title}
				</h3>
				<p data-testid='card-description'>{description}</p>
			</div>
			<div className={styles.card__info}>
				<p className={styles['card__info-item']}>
					<span className={styles.card__heading}>Authors: </span>
					<span data-testid='card-authors'>{courseAuthors}</span>
				</p>
				<p className={styles['card__info-item']}>
					<span className={styles.card__heading}>Duration: </span>
					<span data-testid='card-duration'>{courseDuration}</span>
				</p>
				<p className={styles['card__info-item']}>
					<span className={styles.card__heading}>Created: </span>
					<span data-testid='card-creation'>{creationDate}</span>
				</p>
				<div className={styles.card__buttons}>
					<Button onClick={showCourseInfoHandler}>Show course</Button>
					{userRole === 'admin' && (
						<>
							<Button onClick={updateCourseHandler}>
								<svg
									width='17px'
									height='17px'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z'
										fill='#ffffff'
									/>
								</svg>
							</Button>

							<Button onClick={deleteCourseHandler}>
								<svg
									width='17px'
									height='17px'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 0.5H9C8.44772 0.5 8 0.947715 8 1.5Z'
										fill='#ffffff'
									/>
									<path
										d='M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z'
										fill='#ffffff'
									/>
								</svg>
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
