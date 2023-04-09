import { Course } from '../../types/types';

export type Courses = {
	courses: Course[];
	isLoading: boolean;
	error: string | null;
};

export type CourseApi = {
	title: string;
	description: string;
	duration: number;
	authors: string[];
};

export type CourseId = {
	id: string;
};
