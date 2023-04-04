import { Courses } from '../types/course';
import { CoursesActions, CoursesActionTypes } from './actionTypes';

const coursesInitialState: Courses = {
	courses: [],
	isLoading: false,
	error: null,
};

export const coursesReducer = (
	state: Courses = coursesInitialState,
	action: CoursesActions
) => {
	switch (action.type) {
		case CoursesActionTypes.COURSE_IS_LOADING:
			return { ...state, isLoading: true };

		case CoursesActionTypes.GET_COURSES:
			return { ...state, courses: action.payload, isLoading: false };

		case CoursesActionTypes.ADD_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],
				isLoading: false,
			};

		case CoursesActionTypes.UPDATE_COURSE:
			const id = action.payload.id;
			const filteredCourses = state.courses.filter((el) => el.id !== id);
			return {
				...state,
				courses: [...filteredCourses, action.payload],
				isLoading: false,
			};

		case CoursesActionTypes.DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((course) => course.id !== action.payload),
				isLoading: false,
			};

		case CoursesActionTypes.COURSE_FETCH_HAS_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
