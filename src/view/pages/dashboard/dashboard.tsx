import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/card/Сard';
import { dashboardTestLocalData, ITestData } from '../../../data/dashboard-data';
import { CommonLayout } from '../common/CommonLayout';
import { TestWizard } from '../../components/testwizard/testwizard';
import { ApiLocalStorage } from '../../../service/api.localstorage';

const Dashboard = (): JSX.Element => {
	const [showTestWIzardModal, setShowTestWizardModal] = useState<boolean>(false);
	const [testList, setTestList] = useState<ITestData[]>(dashboardTestLocalData);
	const [searchValue, setSearchValue] = useState<string>('');
	const [api] = useState(new ApiLocalStorage());

	const navigate = useNavigate();

	const updateList = (): void => {
		const storageData = api.getData();
		console.log('~~ storageData', storageData);
		setTestList([...testList, ...storageData].reverse());
	};

	useEffect(() => {
		console.log('>> dashboard mount');
		updateList();
	}, []);

	const onCreateTest = (data: ITestData): void => {
		console.log('onCreateTest', data);
		api.writeData(data);
		updateList();
		setShowTestWizardModal(false);
	};

	const handleNavigation = (testData: ITestData): void => {
		navigate('/exercise', {
			state: { data: testData },
		});
	};

	return (
		<>
			<CommonLayout
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				onCreateTestClick={(): void => setShowTestWizardModal(true)}
			>
				{testList
					.filter((el) => el.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
					.map((testData) => (
						<div onClick={(): void => handleNavigation(testData)}>
							<Card title={testData.title} />
						</div>
					))}
			</CommonLayout>
			{showTestWIzardModal && (
				<TestWizard
					onCreateTest={onCreateTest}
					onCloseModal={(): void => setShowTestWizardModal(false)}
				/>
			)}
		</>
	);
};

export { Dashboard };
