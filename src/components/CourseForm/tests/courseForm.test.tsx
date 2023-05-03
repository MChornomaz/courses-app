import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../helpers/test-utils';
import CourseForm from './../CourseForm';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../constants';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
}));

const useDispatchMock = useDispatch as jest.Mock;

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
		],
		authorsIsLoading: false,
		authorsHasError: null,
	},
};

describe('COURSE FORM', () => {
	test('renders authors lists', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.ADD_COURSE]}>
				<CourseForm />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					courses: mockedState.courses,
					authors: mockedState.authors,
				},
			}
		);
		await Promise.resolve();
		const authors = await waitFor(() => screen.findAllByTestId('authors'));

		expect(authors[0]).toBeInTheDocument();

		const selectAuthorBtn = screen.getAllByTestId('select-author');

		userEvent.click(selectAuthorBtn[0]);

		const selectedAuthors = await waitFor(() =>
			screen.findAllByTestId('course-authors')
		);

		expect(selectedAuthors[0]).toBeInTheDocument();
	});

	test('Create author button must call dispatch', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.ADD_COURSE]}>
				<CourseForm />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					courses: mockedState.courses,
					authors: mockedState.authors,
				},
			}
		);
		await Promise.resolve();
		const addAuthorBtn = await waitFor(() =>
			screen.findByTestId('create-author')
		);

		userEvent.click(addAuthorBtn);

		expect(useDispatchMock).toBeCalledTimes(1);
	});

	test('Add author button click adds an author to course authors list', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.ADD_COURSE]}>
				<CourseForm />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					courses: mockedState.courses,
					authors: mockedState.authors,
				},
			}
		);
		await Promise.resolve();
		const authors = await waitFor(() => screen.findAllByTestId('authors'));
		const authorsText = authors[0].innerText;

		expect(authors[0]).toBeInTheDocument();

		const selectAuthorBtn = screen.getAllByTestId('select-author');

		userEvent.click(selectAuthorBtn[0]);

		const selectedAuthors = await waitFor(() =>
			screen.findAllByTestId('course-authors')
		);

		expect(selectedAuthors[0].innerText).toBe(authorsText);
	});

	test('Delete author button click should delete an author from the course list', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.ADD_COURSE]}>
				<CourseForm />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedState.user,
					courses: mockedState.courses,
					authors: mockedState.authors,
				},
			}
		);
		await Promise.resolve();

		const authors = await waitFor(() => screen.findAllByTestId('authors'));

		expect(authors[0]).toBeInTheDocument();

		const selectAuthorBtn = screen.getAllByTestId('select-author');

		userEvent.click(selectAuthorBtn[0]);

		const selectedAuthors = await waitFor(() =>
			screen.findAllByTestId('course-authors')
		);

		expect(selectedAuthors[0]).toBeInTheDocument();

		expect(selectedAuthors.length).toBe(1);

		setTimeout(() => {
			expect(authors.length).toBe(5);
		}, 2000);

		const removeAuthorBtn = await waitFor(() =>
			screen.findAllByTestId('remove-author')
		);

		userEvent.click(removeAuthorBtn[0]);

		setTimeout(() => {
			expect(authors.length).toBe(6);
			expect(selectedAuthors).not.toBeInTheDocument();
		}, 2000);
	});
});
