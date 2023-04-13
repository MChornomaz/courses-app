import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { Course } from '../../types/types';

import {
	ADD_COURSE_BUTTON,
	mockedCoursesList,
	NO_COURSES,
	ROUTES,
} from '../../constants';

import styles from './courses.module.scss';

const Courses = () => {
	const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
	const [clearSearch, setClearSearch] = useState(true);

	const navigate = useNavigate();

	let filteredCourses = courses;

	const searchHandler = useCallback((searchString: string) => {
		let string = searchString.trim().toLowerCase();
		if (string.length > 0) {
			let filteredArray = mockedCoursesList.filter((el) =>
				el.title.trim().toLowerCase().includes(string)
			);

			if (filteredArray.length === 0) {
				filteredArray = mockedCoursesList.filter((el) =>
					el.id.trim().toLowerCase().includes(string)
				);
			}
			setCourses(filteredArray);
		} else {
			return;
		}
	}, []);

	useEffect(() => {
		if (clearSearch) {
			setCourses(mockedCoursesList);
		}
	}, [clearSearch]);

	const createCourseHandler = useCallback(
		() => navigate(ROUTES.ADD_COURSE),
		[navigate]
	);

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
