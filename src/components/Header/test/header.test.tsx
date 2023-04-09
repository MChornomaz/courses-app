import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../helpers/test-utils';
import Header from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: '',
		token: '',
		role: '',
		isLoading: false,
		hasError: null,
	},
	courses: [],
	authors: [],
};

describe('HEADER', () => {
	test('renders user logo', () => {
		renderWithProviders(
			<MemoryRouter initialEntries={['/courses']}>
				<Header />
			</MemoryRouter>,
			{
				preloadedState: { user: mockedState.user },
			}
		);

		const logo = screen.getByTestId('logo');

		expect(logo).toBeInTheDocument();
	});

	test('renders user NAME', async () => {
		renderWithProviders(
			<MemoryRouter initialEntries={['/courses']}>
				<Header />
			</MemoryRouter>,
			{
				preloadedState: { user: mockedState.user },
			}
		);

		const userName = screen.getByTestId('user-name');

		expect(userName).toBeInTheDocument();
	});
});
