import React, { useState } from 'react';
import cn from 'classnames';
import './table.css';

const tableData = [
	{
		name: 'Alex',
		result: '5 / 5',
		calculatedResult: '5',
	},
	{
		name: 'John',
		result: '4 / 5',
		calculatedResult: '4',
	},
	{
		name: 'Alice',
		result: '5 / 5',
		calculatedResult: '5',
	},
	{
		name: 'Marie',
		result: '4 / 5',
		calculatedResult: '4',
	},
	{
		name: 'Sam',
		result: '3 / 5',
		calculatedResult: '3',
	},
	{
		name: 'Lea',
		result: '4 / 5',
		calculatedResult: '4',
	},
	{
		name: 'Sven',
		result: '5 / 5',
		calculatedResult: '5',
	},
	{
		name: 'Ruri',
		result: '4 / 5',
		calculatedResult: '4',
	},
	{
		name: 'Alfred',
		result: '4 / 5',
		calculatedResult: '4',
	},
	{
		name: 'Linux',
		result: '3 / 5',
		calculatedResult: '3',
	},
];

export const Table = (): JSX.Element => {
	return (
		<table className="styled-table">
			<thead>
				<tr>
					<th>Имя</th>
					<th>Результат</th>
					<th>Вычисленная оценка</th>
				</tr>
			</thead>
			<tbody>
				{tableData.map((el) => (
					<tr key={`table-${el.name}-${el.result}`}>
						<td>{el.name}</td>
						<td>{el.result}</td>
						<td>{el.calculatedResult}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
