import { Course } from '../../types/types';
import { CoursesActionTypes, CoursesActions } from './actionTypes';

export const getCourses = (payload: Course[]): CoursesActions => ({
	type: CoursesActionTypes.GET_COURSES,
	payload,
});

export const addCourse = (payload: Course): CoursesActions => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload,
});

export const updateCourse = (payload: Course): CoursesActions => ({
	type: CoursesActionTypes.UPDATE_COURSE,
	payload,
});

export const deleteCourse = (payload: string): CoursesActions => ({
	type: CoursesActionTypes.DELETE_COURSE,
	payload,
});

export const courseIsLoading = (): CoursesActions => ({
	type: CoursesActionTypes.COURSE_IS_LOADING,
});

export const setCourseFetchError = (payload: string): CoursesActions => ({
	type: CoursesActionTypes.COURSE_FETCH_HAS_ERROR,
	payload,
});
