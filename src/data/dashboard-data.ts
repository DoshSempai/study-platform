export interface IDashboardCardData {
	title: string;
	testId: string;
	isTestActive: boolean;
	isTrainActive: boolean;
}

export const dashboardCardData: IDashboardCardData[] = [
	{
		title: 'Only Button',
		testId: '1',
		isTestActive: true,
		isTrainActive: true,
	},
	{
		title: 'Only Touch',
		testId: '2',
		isTestActive: true,
		isTrainActive: true,
	},
	{
		title: 'Button & Touch',
		testId: '3',
		isTestActive: true,
		isTrainActive: true,
	},
	{
		title: 'Disabled',
		testId: '4',
		isTestActive: false,
		isTrainActive: false,
	},
	{
		title: 'Соли - тест 1',
		testId: '5',
		isTestActive: true,
		isTrainActive: true,
	},
	{
		title: 'Основания - тест 1',
		testId: '6',
		isTestActive: true,
		isTrainActive: true,
	},
	{
		title: 'Кислоты - тест 1',
		testId: '7',
		isTestActive: true,
		isTrainActive: true,
	},
];
