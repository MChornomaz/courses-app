import { Course } from '../../types/types';

export type Courses = {
	courses: Course[];
	isLoading: boolean;
	error: string | null;
};
