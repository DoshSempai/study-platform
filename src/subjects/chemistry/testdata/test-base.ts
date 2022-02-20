import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';

export const testBase1: Array<ITestExerciseAll> = [
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: '',
		question: {
			reactants: [
				{
					parts: [{ base: 'Na', index: 2 }, { base: 'O' }],
				},
				{
					parts: [{ base: 'H', index: 2 }, { base: 'O' }],
				},
			],
			products: [
				{
					number: 2,
					parts: [{ base: 'Na' }, { base: 'OH' }],
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
					parts: [{ base: 'Cu' }, { base: 'Br', index: 2 }],
				},
				{
					parts: [{ base: 'Ba' }, { base: 'OH', index: 2 }],
				},
			],
			products: [
				{
					parts: [{ base: 'Cu' }, { base: 'OH', index: 2 }],
				},
				{
					parts: [{ base: 'Ba' }, { base: 'Br', index: 2 }],
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
					parts: [{ base: 'Na' }, { base: 'OH' }],
				},
				{
					parts: [{ base: 'H', index: 2 }, { base: 'C' }, { base: 'O', index: 3 }],
				},
			],
			products: [
				{
					parts: [{ base: 'Na' }, { base: 'H' }, { base: 'C' }, { base: 'O', index: 3 }],
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
					parts: [{ base: 'Ba' }, { base: 'OH', index: 2 }],
				},
				{
					parts: [{ base: 'K', index: 2 }, { base: 'S' }, { base: 'O', index: 4 }],
				},
			],
			products: [
				{
					number: 2,
					parts: [{ base: 'K' }, { base: 'OH' }],
				},
				{
					parts: [{ base: 'Ba' }, { base: 'S' }, { base: 'O', index: 4 }],
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
					parts: [{ base: 'Fe' }, { base: 'OH', index: 2 }],
				},
				{
					parts: [{ base: 'O', index: 2 }],
				},
				{
					number: 2,
					parts: [{ base: 'H', index: 2 }, { base: 'O' }],
				},
			],
			products: [
				{
					parts: [{ base: 'Fe' }, { base: 'OH', index: 3 }],
				},
			],
		},
	},
];
