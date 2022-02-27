import React from 'react';
import { IResult } from '../../../data/dashboard-data';
import './table.css';

interface ITable {
	results: IResult[];
}

export const Table = ({ results }: ITable): JSX.Element => {
	return (
		<table className="styled-table">
			<thead>
				<tr>
					<th>Имя</th>
					<th>Результат</th>
					{/* <th>Вычисленная оценка</th> */}
				</tr>
			</thead>
			<tbody>
				{results.map((el) => (
					<tr key={`table-${el.name}-${el.result}`}>
						<td>{el.name}</td>
						<td>{el.result}</td>
						{/* <td>{el.calculatedResult}</td> */}
					</tr>
				))}
			</tbody>
		</table>
	);
};
