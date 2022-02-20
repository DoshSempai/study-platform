import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/card/Сard';
import { dashboardCardData } from '../../../data/dashboard-data';
import { CommonLayout } from '../common/CommonLayout';
import { TestWizard } from '../../components/testwizard/testwizard';

const Dashboard = (): JSX.Element => {
	const [showTestWIzardModal, setShowTestWizardModal] = useState<boolean>(true);
	return (
		<>
			<CommonLayout onCreateTestClick={(): void => setShowTestWizardModal(true)}>
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
			{showTestWIzardModal && (
				<TestWizard onCloseModal={(): void => setShowTestWizardModal(false)} />
			)}
		</>
	);
};

export { Dashboard };
