import { ITestExerciseAll } from './exercise-types';
import { exerciseList } from './test-exercise';

export interface ITestCommonData {
	title: string;
	authorId: number;
	testMode: boolean;
	trainMode: boolean;
	parole?: string;
}

export interface ITestData extends ITestCommonData {
	test: ITestExerciseAll[];
	results?: string;
}

export const dashboardTestLocalData: ITestData[] = [
	{
		title: 'Only Button',
		authorId: -1,
		testMode: true,
		trainMode: true,
		test: exerciseList['1'],
	},
	{
		title: 'Only Touch',
		authorId: -1,
		testMode: true,
		trainMode: true,
		test: exerciseList['2'],
	},
	{
		title: 'Button & Touch',
		authorId: -1,
		testMode: true,
		trainMode: true,
		test: exerciseList['3'],
	},
	{
		title: 'Соли - тест 1',
		authorId: -1,
		testMode: true,
		trainMode: true,
		test: exerciseList['4'],
	},
	{
		title: 'Основания - тест 1',
		authorId: -1,
		testMode: true,
		trainMode: true,
		test: exerciseList['5'],
	},
	{
		title: 'Кислоты - тест 1',
		authorId: -1,
		testMode: true,
		trainMode: true,
		test: exerciseList['6'],
	},
];
