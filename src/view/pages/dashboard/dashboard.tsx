import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/card/Сard';
import { dashboardTestLocalData } from '../../../data/dashboard-data';
import { CommonLayout } from '../common/CommonLayout';
import { TestWizard } from '../../components/testwizard/testwizard';

const Dashboard = (): JSX.Element => {
	const [showTestWIzardModal, setShowTestWizardModal] = useState<boolean>(true);
	return (
		<>
			<CommonLayout onCreateTestClick={(): void => setShowTestWizardModal(true)}>
				{dashboardTestLocalData.map((testData) => (
					<Link
						key={testData.title}
						to="/exercise"
						state={{ data: testData }}
						className="stplatform-link card_wrap"
					>
						<Card title={testData.title} />
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
