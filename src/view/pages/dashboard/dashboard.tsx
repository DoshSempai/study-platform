import React from 'react';
import { Link } from 'react-router-dom';
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
					<Link key={title} to="/exercise" className="stplatform-link">
						<Card title={title} />
					</Link>
				))}
			</Content>
		</div>
	</>
);

export { Dashboard };
