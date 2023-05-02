import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

import Button from '../../../../common/Button/Button';

import pipeDuration from '../../../../helpers/pipeDuration';
import { Course, Author } from '../../../../types/types';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getAllAuthors } from '../../../../store/selectors';
import { useTypedDispatch } from '../../../../hooks/useTypedDispatch';
import { deleteCourse } from '../../../../store/courses/actionCreators';

import styles from './courseCard.module.scss';
import { ROUTES } from '../../../../constants';
import CheckIcon from '../../../../static/icons/CheckIcon';
import DeleteIcon from '../../../../static/icons/DeleteIcon';

type CardProps = {
	cardInfo: Course;
};

const CourseCard: React.FC<CardProps> = ({ cardInfo }) => {
	const { id, title, duration, creationDate, authors } = cardInfo;
	let { description } = cardInfo;

	let { authors: authorsArray } = useTypedSelector(getAllAuthors);

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
		navigate(`${ROUTES.COURSES}/${id}`);
	}, [id, navigate]);

	const deleteCourseHandler = useCallback(() => {
		dispatch(deleteCourse(id));
	}, [dispatch, id]);

	const cutString = useCallback((str: string, number: number) => {
		return str.slice(0, number);
	}, []);

	if (description && description.length > 420) {
		description = cutString(description, 420) + '...';
	}

	return (
		<div className={styles.card}>
			<div className={styles.card__description}>
				<h3 className={styles.card__title}>{title}</h3>
				<p>{description}</p>
			</div>
			<div className={styles.card__info}>
				<p className={styles['card__info-item']}>
					<span className={styles.card__heading}>Authors: </span>
					<span>{courseAuthors}</span>
				</p>
				<p className={styles['card__info-item']}>
					<span className={styles.card__heading}>Duration: </span>
					<span>{courseDuration}</span>
				</p>
				<p className={styles['card__info-item']}>
					<span className={styles.card__heading}>Created: </span>
					<span>{creationDate}</span>
				</p>
				<div className={styles.card__buttons}>
					<Button onClick={showCourseInfoHandler}>Show course</Button>
					<Button>
						<CheckIcon />
					</Button>

					<Button onClick={deleteCourseHandler}>
						<DeleteIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
