export interface ITestButtonExercise {
	type: 'button';
	title: string;
	question: string;
	answer: string;
	variants: Array<string>;
}

export const testButtonExercise: Array<ITestButtonExercise> = [
	{
		type: 'button',
		title: 'Выберите правильный ответ',
		question: '1 + 1 = 2',
		answer: 'true',
		variants: ['true', 'false'],
	},
	{
		type: 'button',
		title: 'Выберите правильный ответ',
		question: '1 - 1 = 0',
		answer: 'true',
		variants: ['true', 'false'],
	},
	{
		type: 'button',
		title: 'Выберите правильный ответ',
		question: '1 - 1 = 1',
		answer: 'false',
		variants: ['true', 'false'],
	},
];
