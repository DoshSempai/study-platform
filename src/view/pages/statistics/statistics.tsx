import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { CSVLink } from 'react-csv';
import { Table } from '../../components/table/table';
import { CommonLayout } from '../common/CommonLayout';
import { Histogram } from '../../components/histogram/histogram';
import { DownloadIcon } from '../../../assets/svg';
import { IResult, ITestData } from '../../../data/dashboard-data';

enum Tabs {
	Table,
	Hist,
}

export const Statistics = (): JSX.Element => {
	const { state } = useLocation();
	const locationData = (state as any).data as ITestData;
	const results: IResult[] = locationData.results || [];
	const csvData = results.map((el) => Object.values(el));

	const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Table);

	const handleTabClick = (data: Tabs): void => {
		if (activeTab === data) return;
		setActiveTab(data);
	};

	return (
		<CommonLayout>
			<div style={{ width: '100%' }}>
				<div className="header-with-controls">
					<div className="st-h2">Результаты</div>
					<div className="st-tabs">
						<div className="card__action" style={{ marginRight: '12px' }}>
							<CSVLink data={csvData}>
								<DownloadIcon />
							</CSVLink>
						</div>
						<div
							className={cn('st-tab', {
								'st-tab--active': activeTab === Tabs.Table,
							})}
							onClick={(): void => handleTabClick(Tabs.Table)}
						>
							Таблица
						</div>
						<div
							className={cn('st-tab', {
								'st-tab--active': activeTab === Tabs.Hist,
							})}
							onClick={(): void => handleTabClick(Tabs.Hist)}
						>
							Гистограмма
						</div>
					</div>
				</div>
				{activeTab === Tabs.Table ? <Table results={results} /> : <Histogram results={results} />}
			</div>
		</CommonLayout>
	);
};
