import React from 'react';
import ReactECharts from 'echarts-for-react';
import './histogram.css';
import { IResult } from '../../../data/dashboard-data';

interface ITable {
	results: IResult[];
}

const getXData = (results: IResult[]): string[] => {
	const firstResult = results[0] && results[0].result;
	return firstResult
		? Array.from({ length: Number(firstResult.split('/')[1]) + 1 }, (_, index) => `${index}`)
		: [];
};

export const Histogram = ({ results }: ITable): JSX.Element => {
	const xData = getXData(results);
	const values = results.map((el) => Number(el.result.split('/')[0]));
	const reducedData: { [k: string]: number } = {};
	xData.forEach((el) => {
		reducedData[el] = 0;
	});
	values.forEach((el) => {
		reducedData[`${el}`]++;
	});
	const data = Object.values(reducedData);

	return (
		<ReactECharts
			option={{
				xAxis: {
					type: 'category',
					name: 'Оценки',
					data: xData,
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
						data: data,
						type: 'bar',
						color: '#56D1BB',
					},
				],
			}}
		/>
	);
};
