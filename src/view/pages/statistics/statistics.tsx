import React from 'react';
import { Table } from '../../components/table/table';
import { CommonLayout } from '../common/CommonLayout';

export const Statistics = (): JSX.Element => {
	return (
		<CommonLayout>
			<div style={{ width: '100%' }}>
				<div className="st-h2">Результаты</div>
				<Table />
			</div>
		</CommonLayout>
	);
};
