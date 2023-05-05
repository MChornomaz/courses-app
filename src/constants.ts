export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
has been the industry's standard dummy text ever since the
1500s, when an unknown
printer took a galley of type and scrambled it to make a type
specimen book. It has survived
not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
has been the industry's standard dummy text ever since the
1500s, when an unknown
printer took a galley of type and scrambled it to make a type
specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];
export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

export const NO_COURSES = 'Courses were not found!';

export const ADD_COURSE_BUTTON = 'Add new course';

export const NO_AUTHORS_FOUND = 'Author list is empty';

//API URLs

export const GET_AUTHORS_URL = `${process.env.REACT_APP_SERVER_URL}/authors/all`;

export const GET_COURSES_URL = `${process.env.REACT_APP_SERVER_URL}/courses/all`;

export const GET_CURRENT_USER_URL = `${process.env.REACT_APP_SERVER_URL}/users/me`;

export const LOG_IN_URL = `${process.env.REACT_APP_SERVER_URL}/login`;

export const LOG_OUT_URL = `${process.env.REACT_APP_SERVER_URL}/logout`;

export const ADD_COURSE_URL = `${process.env.REACT_APP_SERVER_URL}/courses/add`;

export const ADD_AUTHOR_URL = `${process.env.REACT_APP_SERVER_URL}/authors/add`;

export const DELETE_COURSE_URL = `${process.env.REACT_APP_SERVER_URL}/courses/`;

export const UPDATE_COURSE_URL = `${process.env.REACT_APP_SERVER_URL}/courses/`;

export const ROUTES = {
	COURSES: '/courses',
	ADD_COURSE: '/courses/add',
	UPDATE_COURSE: '/courses/update',
	REGISTRATION: '/registration',
	LOGIN: '/login',
	LOGOUT: '/logout',
};

export const mockedState = {
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
