import {
	ExerciseType,
	ITestExercise,
	ITestExerciseAll,
	ITestExerciseButton,
	ITestExerciseTouch,
} from './exercise-types';

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

// type ChemicalItem = {
// 	base: string;
// 	index: number;
// };

// type ChemicalMolecule = {
// 	number?: number;
// 	parts: Array<ChemicalItem>;
// };

// const molecule: ChemicalMolecule = {
// 	number: 2,
// 	parts: [
// 		{
// 			base: 'H',
// 			index: 2,
// 		},
// 	],
// };

// const chemicalElementData = {};

export const testTouchExercise: Array<ITestExerciseTouch> = [
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: '2-H#2 + O#2 = 2-H#2-O',
	},
	{
		type: ExerciseType.touch,
		title: 'Составьте реакцию',
		answer: 'H#2 + S-O#4 = H#2-S-O#4',
	},
];
