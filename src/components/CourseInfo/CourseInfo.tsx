import { useParams, NavLink } from 'react-router-dom';
import { Course } from '../../types/types';

import pipeDuration from '../../helpers/pipeDuration';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getAllAuthors, getAllCourses } from './../../store/selectors';

import styles from './CourseInfo.module.scss';

const CourseInfo = () => {
	const params = useParams();
	const { courseId } = params;
	const { courses } = useTypedSelector(getAllCourses);
	const course: Course = courses.filter((item) => item.id === courseId)[0];
	let durationString = '';

	if (course) {
		durationString = pipeDuration(course.duration);
	}

	const { authors } = useTypedSelector(getAllAuthors);

	return (
		<div
			style={{ padding: '5rem 5%' }}
			className={`wrapper ${styles['card-info']}`}
		>
			<NavLink to='/courses' className={styles.link}>
				{' '}
				&lt; Back to course
			</NavLink>
			{course && (
				<>
					<h2 className={styles['card-info__heading']}>{course.title}</h2>
					<div className={styles['card-info__container']}>
						<p className={styles['card-info__description']}>
							{course.description}
						</p>
						<div>
							<p className={styles['card-info__item']}>
								<span className={styles['card-info__criteria']}>ID: </span>
								<span>{course.id}</span>
							</p>
							<p className={styles['card-info__item']}>
								<span className={styles['card-info__criteria']}>
									Duration:{' '}
								</span>
								<span>{durationString} hours</span>
							</p>
							<p className={styles['card-info__item']}>
								<span className={styles['card-info__criteria']}>Created: </span>
								<span>{course.creationDate}</span>
							</p>

							<p className={styles['card-info__item']}>
								<span className={styles['card-info__criteria']}>Authors: </span>
							</p>
							<ul className={styles['card-info__authors']}>
								{course.authors.map((authorId) => {
									const author = authors.filter((el) => el.id === authorId)[0];
									if (!author) {
										return null;
									}
									return (
										<li className={styles['card-info__author']} key={authorId}>
											{author.name}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</>
			)}
			{!course && <h2>Course was not found</h2>}
		</div>
	);
};

export default CourseInfo;
