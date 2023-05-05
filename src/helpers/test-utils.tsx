import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { PreloadedState } from 'redux';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../store';
import { userReducer } from './../store/user/reducer';
import { coursesReducer } from '../store/courses/reducer';
import { authorReducer } from '../store/authors/reducer';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},

		store = createStore(
			combineReducers({
				user: userReducer,
				courses: coursesReducer,
				authors: authorReducer,
			}),
			preloadedState
		),
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	return { store, ...render(ui, { wrapper: Wrapper }) };
}
