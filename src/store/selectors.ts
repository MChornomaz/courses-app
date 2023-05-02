import { RootState } from '.';

export const getUser = (state: RootState) => state.user;

export const getAllCourses = (state: RootState) => state.courses;

export const getAllAuthors = (state: RootState) => state.authors;
