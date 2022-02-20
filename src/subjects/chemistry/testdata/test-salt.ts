import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';

/*
{
    type: ExerciseType.touch,
    title: 'Составьте реакцию',
    answer: '',
    question: {
        reactants: [
            {
                number: -1,
                parts: [{ base: '-', index: -1 }],
            },
            {
                parts: [{ base: '-', index: 1 }],
            },
        ],
        products: [
            {
                number: -1,
                parts: [],
            },
        ],
    },
},
*/

export const testSalt1: Array<ITestExerciseAll> = [
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: '',
		question: {
			reactants: [
				{
					number: 2,
					parts: [{ base: 'Al' }],
				},
				{
					number: 3,
					parts: [{ base: 'S' }],
				},
			],
			products: [
				{
					parts: [
						{ base: 'Al', index: 2 },
						{ base: 'S', index: 3 },
					],
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
					parts: [{ base: 'Zn' }],
				},
				{
					number: 2,
					parts: [{ base: 'H' }, { base: 'Cl' }],
				},
			],
			products: [
				{
					parts: [{ base: 'Zn' }, { base: 'Cl', index: 2 }],
				},
				{
					parts: [{ base: 'H', index: 2 }],
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
					parts: [{ base: 'H', index: 2 }, { base: 'S' }, { base: 'O', index: 4 }],
				},
			],
			products: [
				{
					parts: [{ base: 'Ba' }, { base: 'S' }, { base: 'O', index: 4 }],
				},
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
					parts: [{ base: 'Fe' }],
				},
				{
					parts: [{ base: 'S' }],
				},
			],
			products: [
				{
					parts: [{ base: 'Fe' }, { base: 'S' }],
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
					parts: [{ base: 'Ca' }, { base: 'O' }],
				},
				{
					parts: [{ base: 'C' }, { base: 'O', index: 2 }],
				},
			],
			products: [
				{
					parts: [{ base: 'Ca' }, { base: 'C' }, { base: 'O', index: 3 }],
				},
			],
		},
	},
];
