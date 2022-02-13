import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/card/Сard';
import { dashboardCardData } from '../../../data/dashboard-data';
import { CommonLayout } from '../common/CommonLayout';

const Dashboard = (): JSX.Element => (
	<CommonLayout>
		{dashboardCardData.map((title) => (
			<Link key={title} to="/exercise" className="stplatform-link">
				<Card title={title} />
			</Link>
		))}
	</CommonLayout>
);

export { Dashboard };
