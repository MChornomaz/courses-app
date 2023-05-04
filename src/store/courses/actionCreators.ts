import { Course } from '../../types/types';
import { CoursesActionTypes, CoursesActions } from './actionTypes';

export const getCoursesAction = (payload: Course[]): CoursesActions => ({
	type: CoursesActionTypes.GET_COURSES,
	payload,
});

export const addCourseAction = (payload: Course): CoursesActions => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload,
});

export const updateCourseAction = (payload: Course): CoursesActions => ({
	type: CoursesActionTypes.UPDATE_COURSE,
	payload,
});

export const deleteCourseAction = (payload: string): CoursesActions => ({
	type: CoursesActionTypes.DELETE_COURSE,
	payload,
});

export const courseIsLoadingAction = (): CoursesActions => ({
	type: CoursesActionTypes.COURSE_IS_LOADING,
});

export const setCourseFetchErrorAction = (payload: string): CoursesActions => ({
	type: CoursesActionTypes.COURSE_FETCH_HAS_ERROR,
	payload,
});
