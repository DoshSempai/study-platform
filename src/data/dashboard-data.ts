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
		isTestActive: false,
		isTrainActive: false,
	},
];
