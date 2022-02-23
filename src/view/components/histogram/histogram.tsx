import React from 'react';
import ReactECharts from 'echarts-for-react';
import './histogram.css';

const option = {
	xAxis: {
		type: 'category',
		name: 'Оценки',
		data: ['2', '3', '4', '5'],
	},
	yAxis: {
		type: 'value',
		name: 'Количество учеников',
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
	},
	series: [
		{
			data: [1, 8, 14, 11],
			type: 'bar',
			color: '#56D1BB',
		},
	],
};

export const Histogram = (): JSX.Element => {
	return <ReactECharts option={option} />;
};
