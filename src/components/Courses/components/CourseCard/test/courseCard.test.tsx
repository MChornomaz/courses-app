import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../../helpers/test-utils';
import CourseCard from '../CourseCard';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: '',
		token: 'test',
		role: 'admin',
		isLoading: false,
		hasError: null,
	},
	courses: {
		courses: [
			{
				title: 'TypeScript',
				description:
					"Lorem Ipsum is simply dummy text of the printing and\ntypesetting industry. Lorem Ipsum\nhas been the industry's standard dummy text ever since the\n1500s, when an unknown\nprinter took a galley of type and scrambled it to make a type\nspecimen book. It has survived\nnot only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
				duration: 269,
				authors: [
					'fcca27c8-0a15-4b7b-9d42-8a19f3553607',
					'40b21bd5-cbae-4f33-b154-0252b1ae03a9',
				],
				creationDate: '06/04/2023',
				id: 'a2aefad9-89ab-4525-87a8-6d3503c16a80',
			},
			{
				title: 'Angular',
				description:
					"Lorem Ipsum is simply dummy text of the printing and\ntypesetting industry. Lorem Ipsum\nhas been the industry's standard dummy text ever since the\n1500s, when an unknown\nprinter took a galley of type and scrambled it to make a type\nspecimen book.",
				duration: 652,
				authors: ['ea3d7477-c9a4-4358-9450-ca4ad7af7ad3'],
				creationDate: '06/04/2023',
				id: 'd74a6710-35ec-4773-b029-fee48121d3db',
			},
		],
		isLoading: false,
		error: null,
	},
	authors: {
		authors: [
			{
				name: 'author',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author2',
				id: '1c972c52-3198-4098-b6f7-799b45903199',
			},
			{
				name: 'author3',
				id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			},
			{
				name: 'author4',
				id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
			},
			{
				name: 'author5',
				id: '5e0b0f18-32c9-4933-b142-50459b47f09e',
			},
			{
				name: 'author6',
				id: '9987de6a-b475-484a-b885-622b8fb88bda',
			},
			{
				name: 'Max',
				id: 'fcca27c8-0a15-4b7b-9d42-8a19f3553607',
			},
			{
				name: 'Max12',
				id: 'f6e4f843-f0aa-4f9e-aa87-61b579357184',
			},
			{
				name: 'Maxs',
				id: 'ef4ab028-fd89-478d-88df-27f3303aba98',
			},
			{
				name: 'Max',
				id: '32235f81-44d3-493e-bc64-d2f493dc4d9a',
			},
			{
				name: 'Maksym',
				id: 'ea3d7477-c9a4-4358-9450-ca4ad7af7ad3',
			},
		],
		authorsIsLoading: false,
		authorsHasError: null,
	},
};

describe('HEADER', () => {
	test('renders title', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={['/courses']}>
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
			<MemoryRouter initialEntries={['/courses']}>
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
			<MemoryRouter initialEntries={['/courses']}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					authors: mockedState.authors,
				},
			}
		);

		const duration = screen.getByTestId('card-duration');

		expect(duration).toBeInTheDocument();
		expect(duration).not.toBeNull();
		expect(duration.innerHTML).toMatch(/\b\d\d:\d\d\b/);
	});

	test('renders authors', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={['/courses']}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					authors: mockedState.authors,
				},
			}
		);

		const authors = screen.getByTestId('card-authors');

		expect(authors).toBeInTheDocument();
		expect(authors).not.toBeNull();
	});

	test('renders creation date', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={['/courses']}>
				<CourseCard cardInfo={mockedState.courses.courses[0]} />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					authors: mockedState.authors,
				},
			}
		);

		const creationDate = screen.getByTestId('card-creation');

		expect(creationDate).toBeInTheDocument();
		expect(creationDate).not.toBeNull();
		expect(creationDate.innerHTML).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
	});
});
