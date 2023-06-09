import { useNavigate } from 'react-router-dom';
import React, { useMemo, useCallback } from 'react';

import Button from '../../../../common/Button/Button';

import pipeDuration from '../../../../helpers/pipeDuration';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../../../hooks/useTypedDispatch';
import { getAllAuthors } from '../../../../store/selectors';
import { Course, Author } from '../../../../types/types';

import { getUser } from './../../../../store/selectors';
import { deleteCourse } from '../../../../store/courses/thunk';
import userIsAdmin from '../../../../helpers/userisAdmin';
import CheckIcon from '../../../../static/icons/CheckIcon';
import DeleteIcon from '../../../../static/icons/DeleteIcon';
import { ROUTES } from '../../../../constants';

import styles from './courseCard.module.scss';

type CardProps = {
	cardInfo: Course;
};

const CourseCard: React.FC<CardProps> = ({ cardInfo }) => {
	const { id, title, duration, creationDate, authors } = cardInfo;
	let { description } = cardInfo;
	const user = useTypedSelector(getUser);

	let { authors: authorsArray } = useTypedSelector(getAllAuthors);
	const { token } = useTypedSelector(getUser);

	const navigate = useNavigate();
	const dispatch = useTypedDispatch();

	const isAdmin = userIsAdmin(user);

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
		navigate(`${ROUTES.COURSES}/${id}`);
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
		navigate(`${ROUTES.UPDATE_COURSE}/${id}`);
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
					{isAdmin && (
						<>
							<Button onClick={updateCourseHandler}>
								<CheckIcon />
							</Button>

							<Button onClick={deleteCourseHandler}>
								<DeleteIcon />
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
