import { Course } from '../../types/types';

export enum CoursesActionTypes {
	GET_COURSES = 'GET_COURSES',
	ADD_COURSE = 'ADD_COURSE',
	UPDATE_COURSE = 'UPDATE_COURSE',
	DELETE_COURSE = 'DELETE_COURSE',
	COURSE_IS_LOADING = 'COURSE_IS_LOADING',
	COURSE_FETCH_HAS_ERROR = 'COURSE_FETCH_HAS_ERROR',
}

type GetCoursesAction = {
	type: CoursesActionTypes.GET_COURSES;
	payload: Course[];
};

type AddCourseAction = {
	type: CoursesActionTypes.ADD_COURSE;
	payload: Course;
};

type UpdateCourseAction = {
	type: CoursesActionTypes.UPDATE_COURSE;
	payload: Course;
};

type DeleteCourseAction = {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
};

type CourseIsLoadingAction = {
	type: CoursesActionTypes.COURSE_IS_LOADING;
};

type CourseFetchErrorAction = {
	type: CoursesActionTypes.COURSE_FETCH_HAS_ERROR;
	payload: string;
};
type CourseDefaultAction = {
	type: undefined;
};

export type CoursesActions =
	| GetCoursesAction
	| AddCourseAction
	| UpdateCourseAction
	| DeleteCourseAction
	| CourseIsLoadingAction
	| CourseFetchErrorAction
	| CourseDefaultAction;
