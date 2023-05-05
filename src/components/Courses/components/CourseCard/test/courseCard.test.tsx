import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../../helpers/test-utils';
import CourseCard from '../CourseCard';
import { ROUTES, mockedState } from '../../../../../constants';

describe('HEADER', () => {
	test('renders title', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					authors: mockedState.authors,
				},
			}
		);

		const title = screen.getByTestId('card-title');

		expect(title).toBeInTheDocument();
		expect(title).not.toBeNull();
	});

	test('renders description', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					authors: mockedState.authors,
				},
			}
		);

		const description = screen.getByTestId('card-description');

		expect(description).toBeInTheDocument();
		expect(description).not.toBeNull();
	});

	test('renders duration', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: mockedState,
			}
		);

		const duration = screen.getByTestId('card-duration');

		expect(duration).toBeInTheDocument();
		expect(duration).not.toBeNull();
		expect(duration.innerHTML).toMatch(/\b\d\d:\d\d\b/);
	});

	test('renders authors', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: mockedState,
			}
		);

		const authors = screen.getByTestId('card-authors');

		expect(authors).toBeInTheDocument();
		expect(authors).not.toBeNull();
	});

	test('renders creation date', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.COURSES]}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: mockedState,
			}
		);

		const creationDate = screen.getByTestId('card-creation');

		expect(creationDate).toBeInTheDocument();
		expect(creationDate).not.toBeNull();
		expect(creationDate.innerHTML).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
	});
});
