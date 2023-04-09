import { addCourseAction, getCoursesAction } from '../courses/actionCreators';
import { coursesReducer } from '../courses/reducer';

describe('COURSES REDUCER', () => {
	test('returns initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual({
			courses: [],
			isLoading: false,
			error: null,
		});
	});

	test('handle Add course and returns new state', () => {
		const initialState = {
			courses: [],
			isLoading: false,
			error: null,
		};

		let course = {
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
		};
		expect(coursesReducer(initialState, addCourseAction(course))).toEqual({
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
			],
			isLoading: false,
			error: null,
		});
	});

	test('handle Get_Courses and returns new state', () => {
		const initialState = {
			courses: [],
			isLoading: false,
			error: null,
		};

		let courses = [
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
		];
		expect(coursesReducer(initialState, getCoursesAction(courses))).toEqual({
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
		});
	});
});
