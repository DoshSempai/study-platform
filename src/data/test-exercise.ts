import { createReactionLine } from '../subjects/chemistry/controls_ex_touch';
import { ExerciseType, ITestExerciseAll, ITestExerciseTouch } from './exercise-types';

export const testButtonExercise: Array<ITestExerciseAll> = [
	{
		type: ExerciseType.button,
		title: 'Выберите правильный ответ',
		question: '1 + 1 = 2',
		answer: 'true',
		variants: ['true', 'false'],
	},
	{
		type: ExerciseType.button,
		title: 'Выберите правильный ответ',
		question: '1 - 1 = 0',
		answer: 'true',
		variants: ['true', 'false'],
	},
	{
		type: ExerciseType.button,
		title: 'Выберите правильный ответ',
		question: '1 - 1 = 1',
		answer: 'false',
		variants: ['true', 'false'],
	},
];

export const testTouchExercise: Array<ITestExerciseTouch> = [
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: '',
		uId: '1',
		getAnwerElement: createReactionLine,
		question: {
			reactants: [
				{
					number: 2,
					parts: [{ base: 'H', index: 2 }],
				},
				{
					parts: [{ base: 'O', index: 2 }],
				},
			],
			products: [
				{
					number: 2,
					parts: [{ base: 'H', index: 2 }, { base: 'O' }],
				},
			],
		},
	},
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: '',
		uId: '2',
		getAnwerElement: createReactionLine,
		question: {
			reactants: [
				{
					parts: [
						{ base: 'Fe', index: 2 },
						{ base: 'O', index: 3 },
					],
				},
				{
					number: 3,
					parts: [{ base: 'H', index: 2 }, { base: 'O' }],
				},
			],
			products: [
				{
					number: 2,
					parts: [{ base: 'Fe' }, { base: 'OH', index: 3 }],
				},
			],
		},
	},
];
