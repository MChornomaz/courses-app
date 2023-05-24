import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../helpers/test-utils';
import Courses from '../Courses';
import { NO_COURSES, ROUTES, mockedState } from './../../../constants';
import { fetchAllCourses } from '../../../services';

jest.mock('../../../services', () => ({
	fetchAllCourses: jest.fn(async () => [mockedState.courses.courses]),
}));

describe('COURSES', () => {
	test('renders CourseCard amount equal length of courses array', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<Courses />
			</MemoryRouter>,
			{
				preloadedState: mockedState,
			}
		);

		const courses = await screen.findAllByTestId('courses-card');

		expect(courses).toHaveLength(mockedState.courses.courses.length);
	});

	test('renders no courses found if courses array is empty', async () => {
		(fetchAllCourses as jest.Mock).mockReturnValueOnce([]);

		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<Courses />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					authors: mockedState.authors,
					courses: {
						error: null,
						isLoading: false,
						courses: [],
					},
				},
			}
		);

		const coursesNotFound = await screen.findByTestId('no-courses');

		expect(coursesNotFound.innerHTML).toBe(NO_COURSES);
	});

	test('renders CourseForm after click on button Add new course', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<Courses />
			</MemoryRouter>,
			{
				preloadedState: mockedState,
			}
		);

		const addCourseBtn = await screen.findByTestId('add-course');
		fireEvent.click(addCourseBtn);
		waitFor(async () => {
			expect(screen.getByTestId('course-form')).toBeInTheDocument();
		});
	});
});
