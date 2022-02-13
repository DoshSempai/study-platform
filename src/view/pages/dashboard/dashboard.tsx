import React from 'react';
import { Content } from '../../components/content/Content';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';
import { Card } from '../../components/card/Сard';
import { dashboardCardData } from '../../../data/dashboard-data';

const Dashboard = (): JSX.Element => (
	<>
		<Navigation />
		<div className="app_right">
			<Header />
			<Content>
				{dashboardCardData.map((title) => (
					<Card key={title} title={title} />
				))}
			</Content>
		</div>
	</>
);

export { Dashboard };
