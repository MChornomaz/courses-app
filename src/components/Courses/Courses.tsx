import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Spinner from '../../common/Spinner/Spinner';
import { Course } from '../../types/types';

import { ADD_COURSE_BUTTON, NO_COURSES } from '../../constants';
import { getAllAuthors, getAllCourses } from '../../store/selectors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import {
	getAuthorsAction,
	loadAuthorsAction,
	setAuthorsErrorAction,
} from '../../store/authors/actionCreators';
import { fetchAllAuthors, fetchAllCourses } from '../../services';
import {
	courseIsLoadingAction,
	setCourseFetchErrorAction,
	getCoursesAction,
} from '../../store/courses/actionCreators';
import { getUser } from './../../store/selectors';

import styles from './courses.module.scss';

const Courses = () => {
	const {
		courses: stateCourses,
		error,
		isLoading: coursesLoading,
	} = useTypedSelector(getAllCourses);
	const [courses, setCourses] = useState<Course[]>(stateCourses);
	const [clearSearch, setClearSearch] = useState(true);

	const navigate = useNavigate();
	const { role } = useTypedSelector(getUser);
	const authors = useTypedSelector(getAllAuthors);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		const receiveAllAuthors = async () => {
			try {
				dispatch(loadAuthorsAction());
				const authorArr = await fetchAllAuthors();
				dispatch(getAuthorsAction(authorArr));
			} catch (e) {
				dispatch(setAuthorsErrorAction('Fetching authors failed'));
			}
		};

		receiveAllAuthors();
	}, [dispatch, authors.authors.length]);

	useEffect(() => {
		const receiveAllCourses = async () => {
			try {
				dispatch(courseIsLoadingAction());
				const coursesArr = await fetchAllCourses();
				dispatch(getCoursesAction(coursesArr));
			} catch (e) {
				dispatch(setCourseFetchErrorAction('Failed to fetch courses'));
			}
		};

		receiveAllCourses();
	}, [dispatch]);

	let filteredCourses = courses;

	const searchHandler = useCallback(
		(searchString: string) => {
			let string = searchString.trim().toLowerCase();
			if (string.length > 0) {
				let filteredArray = stateCourses.filter((el) =>
					el.title.trim().toLowerCase().includes(string)
				);

				if (filteredArray.length === 0) {
					filteredArray = stateCourses.filter((el) =>
						el.id.trim().toLowerCase().includes(string)
					);
				}
				setCourses(filteredArray);
			} else {
				return;
			}
		},
		[stateCourses]
	);

	useEffect(() => {
		if (clearSearch) {
			setCourses(stateCourses);
		}
	}, [clearSearch, stateCourses]);

	const createCourseHandler = useCallback(
		() => navigate('/courses/add'),
		[navigate]
	);

	if (authors.authorsIsLoading || coursesLoading) {
		return (
			<div className='wrapper'>
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <h2>OOOps, Something went wrong</h2>;
	}

	return (
		<div className='wrapper'>
			<>
				<div className={styles.header}>
					<SearchBar onSearch={searchHandler} clearSearch={setClearSearch} />
					{role === 'admin' && (
						<Button testid='add-course' onClick={createCourseHandler}>
							{ADD_COURSE_BUTTON}
						</Button>
					)}
				</div>
				<div>
					{filteredCourses &&
						filteredCourses.map((course) => (
							<CourseCard cardInfo={course} key={course.id} />
						))}
					{(!filteredCourses || filteredCourses.length === 0) && (
						<p data-testid='no-courses'>{NO_COURSES}</p>
					)}
				</div>
			</>
		</div>
	);
};

export default Courses;
