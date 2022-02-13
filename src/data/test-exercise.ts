export interface ITestButtonExercise {
	type: 'button';
	title: String;
	question: String;
	answer: String;
	variants: Array<String>;
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
