import { AppThunk, Course } from '../../types/types';
import {
	addCourseAction,
	courseIsLoadingAction,
	deleteCourseAction,
	setCourseFetchErrorAction,
	updateCourseAction,
} from './actionCreators';
import {
	ADD_COURSE_URL,
	DELETE_COURSE_URL,
	UPDATE_COURSE_URL,
} from './../../constants';
import { CourseApi, CourseId } from '../types/course';

export const addNewCourse = (data: CourseApi, token: string): AppThunk => {
	return async (dispatch) => {
		dispatch(courseIsLoadingAction());

		const response = await fetch(ADD_COURSE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		if (result.successful) {
			const newCourse: Course = {
				id: result.result.id,
				title: result.result.title,
				description: result.result.description,
				creationDate: result.result.creationDate,
				authors: result.result.authors,
				duration: result.result.duration,
			};
			dispatch(addCourseAction(newCourse));
		} else {
			dispatch(setCourseFetchErrorAction('Fetching course failed'));
		}
	};
};

export const deleteCourse = (id: CourseId, token: string): AppThunk => {
	return async (dispatch) => {
		dispatch(courseIsLoadingAction());

		const response = await fetch(`${DELETE_COURSE_URL}${id.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(id),
		});
		const result = await response.json();
		if (result.successful) {
			dispatch(deleteCourseAction(id.id));
		} else {
			dispatch(setCourseFetchErrorAction('Fetching course failed'));
		}
	};
};

export const updateCourse = (
	data: CourseApi,
	token: string,
	id: string
): AppThunk => {
	return async (dispatch) => {
		dispatch(courseIsLoadingAction());

		const response = await fetch(`${UPDATE_COURSE_URL}${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		if (result.successful) {
			const updatedCourse: Course = {
				id: result.result.id,
				title: result.result.title,
				description: result.result.description,
				creationDate: result.result.creationDate,
				authors: result.result.authors,
				duration: result.result.duration,
			};
			dispatch(updateCourseAction(updatedCourse));
		} else {
			dispatch(setCourseFetchErrorAction('Fetching course failed'));
		}
	};
};
