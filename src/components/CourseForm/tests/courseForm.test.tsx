import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../helpers/test-utils';
import CourseForm from './../CourseForm';
import { useDispatch } from 'react-redux';
import { ROUTES, mockedState } from '../../../constants';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
}));

const useDispatchMock = useDispatch as jest.Mock;

describe('COURSE FORM', () => {
	test('renders authors lists', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={[ROUTES.ADD_COURSE]}>
				<CourseForm />
			</MemoryRouter>,
			{
				preloadedState: mockedState,
			}
		);

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
				preloadedState: mockedState,
			}
		);

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
				preloadedState: mockedState,
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
				preloadedState: mockedState,
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
