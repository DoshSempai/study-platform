import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/card/Сard';
import { dashboardCardData } from '../../../data/dashboard-data';
import { CommonLayout } from '../common/CommonLayout';

const Dashboard = (): JSX.Element => (
	<CommonLayout>
		{dashboardCardData.map((cardData) => (
			<Link
				key={cardData.title}
				to="/exercise"
				state={{ data: cardData }}
				className="stplatform-link card_wrap"
			>
				<Card title={cardData.title} />
			</Link>
		))}
	</CommonLayout>
);

export { Dashboard };
