import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';

export const testAcids1: Array<ITestExerciseAll> = [
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: '',
		question: {
			reactants: [
				{
					parts: [
						{ base: 'P', index: 2 },
						{ base: 'O', index: 5 },
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
					parts: [{ base: 'H', index: 3 }, { base: 'P' }, { base: 'O', index: 4 }],
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
					parts: [{ base: 'Fe' }, { base: 'S' }],
				},
				{
					parts: [{ base: 'H', index: 2 }, { base: 'S' }, { base: 'O', index: 4 }],
				},
			],
			products: [
				{
					parts: [{ base: 'Fe' }, { base: 'S' }, { base: 'O', index: 4 }],
				},
				{
					parts: [{ base: 'H', index: 2 }, { base: 'S' }],
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
					parts: [{ base: 'Cu' }],
				},
				{
					number: 2,
					parts: [{ base: 'H', index: 2 }, { base: 'S' }, { base: 'O', index: 4 }],
				},
			],
			products: [
				{
					parts: [{ base: 'Cu' }, { base: 'S' }, { base: 'O', index: 4 }],
				},
				{
					parts: [{ base: 'S' }, { base: 'O', index: 2 }],
				},
				{
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
					number: 8,
					parts: [{ base: 'Na' }],
				},
				{
					number: 10,
					parts: [{ base: 'H' }, { base: 'N' }, { base: 'O', index: 3 }],
				},
			],
			products: [
				{
					number: 8,
					parts: [{ base: 'Na' }, { base: 'N' }, { base: 'O', index: 3 }],
				},
				{
					parts: [{ base: 'N', index: 2 }, { base: 'O' }],
				},
				{
					number: 5,
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
						{ base: 'P', index: 2 },
						{ base: 'O', index: 5 },
					],
				},
				{
					parts: [{ base: 'H', index: 2 }, { base: 'O' }],
				},
			],
			products: [
				{
					number: 2,
					parts: [{ base: 'H' }, { base: 'P' }, { base: 'O', index: 3 }],
				},
			],
		},
	},
];
