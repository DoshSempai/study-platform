import { ExerciseType, ITestExerciseAll } from './exercise-types';
import { testSalt1 } from './chemistry/testdata/test-salt';
import { testBase1 } from './chemistry/testdata/test-base';
import { testAcids1 } from './chemistry/testdata/test-acids';

const testButtonExercise: Array<ITestExerciseAll> = [
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

const testTouchExercise: Array<ITestExerciseAll> = [
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: '',
		notes: 'получение воды',
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

export const exerciseList: { [k: string]: ITestExerciseAll[] } = {
	'1': testButtonExercise,
	'2': testTouchExercise,
	'3': [testButtonExercise[0], testTouchExercise[0]],
	'4': testSalt1,
	'5': testBase1,
	'6': testAcids1,
};
