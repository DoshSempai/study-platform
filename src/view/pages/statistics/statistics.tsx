import React, { useState } from 'react';
import cn from 'classnames';
import { Table } from '../../components/table/table';
import { CommonLayout } from '../common/CommonLayout';
import { Histogram } from '../../components/histogram/histogram';

enum Tabs {
	Table,
	Hist,
}

export const Statistics = (): JSX.Element => {
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
				{activeTab === Tabs.Table ? <Table /> : <Histogram />}
			</div>
		</CommonLayout>
	);
};
