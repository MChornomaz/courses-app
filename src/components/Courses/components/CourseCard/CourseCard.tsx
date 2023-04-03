import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

import { mockedAuthorsList } from '../../../../constants';

import pipeDuration from '../../../../helpers/pipeDuration';
import { Course, Author } from '../../../../types/types';
import Button from '../../../../common/Button/Button';

import styles from './courseCard.module.scss';

type CardProps = {
	cardInfo: Course;
};

const CourseCard: React.FC<CardProps> = ({ cardInfo }) => {
	const { id, title, duration, creationDate, authors } = cardInfo;
	let { description } = cardInfo;

	const navigate = useNavigate();

	const authorArr = useMemo(() => {
		let newAuthorArr: Author[] = [];

		authors.forEach((author) => {
			newAuthorArr.push(...mockedAuthorsList.filter((el) => el.id === author));
		});
		return newAuthorArr;
	}, [authors]);

	const courseAuthorsArr = authorArr.map((el) => el.name);
	const courseAuthors = courseAuthorsArr.join(', ');
	const courseDuration = pipeDuration(duration);

	const buttonClickHandler = useCallback(() => {
		navigate(`/courses/${id}`);
	}, [id, navigate]);

	const cutString = useCallback((str: string, number: number) => {
		return str.slice(0, number);
	}, []);

	if (description.length > 420) {
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
				<Button onClick={buttonClickHandler}>Show course</Button>
			</div>
		</div>
	);
};

export default CourseCard;
