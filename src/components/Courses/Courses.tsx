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
	getAuthors,
	loadAuthors,
	setAuthorsError,
} from '../../store/authors/actionCreators';
import { fetchAllAuthors, fetchAllCourses } from '../../services';
import {
	courseIsLoading,
	setCourseFetchError,
} from '../../store/courses/actionCreators';
import { getCourses } from './../../store/courses/actionCreators';

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

	const authors = useTypedSelector(getAllAuthors);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		const receiveAllAuthors = async () => {
			try {
				dispatch(loadAuthors());
				const authorArr = await fetchAllAuthors();
				dispatch(getAuthors(authorArr));
			} catch (e) {
				dispatch(setAuthorsError('Fetching authors failed'));
			}
		};
		// if check was made to make app work correctly
		//and will be removed after adding proper add author to API functionality in the next homework

		if (authors.authors.length === 0) {
			receiveAllAuthors();
		}
	}, [dispatch, authors.authors.length]);

	useEffect(() => {
		const receiveAllCourses = async () => {
			try {
				dispatch(courseIsLoading());
				const coursesArr = await fetchAllCourses();
				dispatch(getCourses(coursesArr));
			} catch (e) {
				dispatch(setCourseFetchError('Failed to fetch courses'));
			}
		};

		if (stateCourses.length === 0) {
			receiveAllCourses();
		}
	}, [dispatch, stateCourses.length]);

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
					<Button onClick={createCourseHandler}>{ADD_COURSE_BUTTON}</Button>
				</div>
				<div>
					{filteredCourses &&
						filteredCourses.map((course) => (
							<CourseCard cardInfo={course} key={course.id} />
						))}
					{filteredCourses.length === 0 && <p>{NO_COURSES}</p>}
				</div>
			</>
		</div>
	);
};

export default Courses;
