import { useReducer, useCallback } from 'react';
import { User } from '../types/types';

type FetchError = {
	successful: boolean;
	errors: string[];
};

type HookState = {
	data: any | null;
	error: FetchError | string | null | undefined;
	status: string | null;
};

enum ReducerActionTypes {
	SEND = 'SEND',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

type HookAction = {
	type: ReducerActionTypes;
	responseData?: any;
	errorMessage?: FetchError;
};

type FunctionData = User;

type RequestFunctionCallback = (
	url: string,
	data: FunctionData | any
) => Promise<void>;

function httpReducer(state: HookState, action: HookAction) {
	const { type, responseData, errorMessage } = action;

	switch (type) {
		case ReducerActionTypes.SEND:
			return {
				data: null,
				error: null,
				status: 'pending',
			};
		case ReducerActionTypes.SUCCESS:
			return {
				data: responseData,
				error: null,
				status: 'completed',
			};
		case ReducerActionTypes.ERROR:
			return {
				data: null,
				error: errorMessage,
				status: 'completed',
			};
		default:
			return state;
	}
}

function useHttp(
	requestFunction: RequestFunctionCallback,
	startWithPending: boolean | string = false
) {
	const initialState: HookState = {
		status: startWithPending ? 'pending' : null,
		data: null,
		error: null,
	};

	const [httpState, dispatch] = useReducer<
		React.Reducer<HookState, HookAction>
	>(httpReducer, initialState);

	const sendRequest = useCallback(
		async function (url: string, requestData: FunctionData): Promise<any> {
			dispatch({ type: ReducerActionTypes.SEND });
			try {
				const responseData = await requestFunction(url, requestData);
				dispatch({ type: ReducerActionTypes.SUCCESS, responseData });
				return responseData;
			} catch (error: any) {
				dispatch({
					type: ReducerActionTypes.ERROR,
					errorMessage: error.errors || 'Something went wrong!',
				});
			}
		},
		[requestFunction]
	);

	return {
		sendRequest,
		...httpState,
	};
}

export default useHttp;
