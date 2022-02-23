import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/card/Сard';
import { dashboardTestLocalData, ITestData } from '../../../data/dashboard-data';
import { CommonLayout } from '../common/CommonLayout';
import { TestWizard } from '../../components/testwizard/testwizard';
import { ApiLocalStorage } from '../../../service/api.localstorage';
import { DeleteIcon, SettingsIcon, StatisticsIcon } from '../../../assets/svg';
import { ActionModal } from '../../components/modal/modal';
import { Input } from '../../components/formparts/textinput/textinput';

export const Dashboard = (): JSX.Element => {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showTestWIzardModal, setShowTestWizardModal] = useState<boolean>(false);
	const [testList, setTestList] = useState<ITestData[]>(dashboardTestLocalData);
	const [searchValue, setSearchValue] = useState<string>('');
	const [api] = useState(new ApiLocalStorage());

	// -------------------------
	const [chosenParoledTest, setChosenParoledTest] = useState<ITestData>();
	const [userName, setUserName] = useState<string>('');
	const [userParole, setUserParole] = useState<string>('');
	const [wrongParoleError, setWrongParoleError] = useState<boolean>(false);
	const [paroleValidationError, setParoleValidationError] = useState<boolean>(false);
	const [showParoleModal, setShowParoleModal] = useState<boolean>(false);
	// -------------------------

	const cardActionsMetaData = [
		{
			icon: <StatisticsIcon />,
			action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
				e.preventDefault();
				e.stopPropagation();
				navigate('/statistics');
			},
		},
		{
			icon: <SettingsIcon />,
			action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
				e.preventDefault();
				e.stopPropagation();
				setShowTestWizardModal(true);
			},
		},
		{
			icon: <DeleteIcon />,
			action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
				e.preventDefault();
				e.stopPropagation();
				setShowDeleteModal(true);
			},
		},
	];

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
		if (testData.parole) {
			setShowParoleModal(true);
			setChosenParoledTest(testData);
			return;
		}
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
							<Card
								title={testData.title}
								hasParole={!!testData.parole}
								actionsMeta={cardActionsMetaData}
							/>
						</div>
					))}
			</CommonLayout>
			{showTestWIzardModal && (
				<TestWizard
					onCreateTest={onCreateTest}
					onCloseModal={(): void => setShowTestWizardModal(false)}
				/>
			)}
			{showDeleteModal && (
				<ActionModal
					title="Удаление теста"
					actionName="Удалить"
					content={<>work in progress</>}
					onClose={(): void => setShowDeleteModal(false)}
					onAction={(): void => {
						/* noop */
					}}
				/>
			)}
			{showParoleModal && (
				<ActionModal
					title="Введите имя и пароль"
					actionName="Войти"
					onClose={(): void => setShowParoleModal(false)}
					onAction={(): void => {
						/* noop */
						console.log(`userName:`, userName);
						console.log(`userParole:`, userParole);

						if (!userName || !userParole) {
							setParoleValidationError(true);
							return;
						}

						if (!chosenParoledTest) {
							return;
						}

						if (userParole !== chosenParoledTest.parole) {
							setWrongParoleError(true);
							return;
						}

						navigate('/exercise', {
							state: {
								data: chosenParoledTest,
								userName: userName,
							},
						});
					}}
					content={
						<div style={{ minWidth: '40vw' }}>
							{wrongParoleError && <div className="modal__error_message">Неверный пароль</div>}
							<div style={{ margin: '10px 0' }}>
								<Input
									error={paroleValidationError && !userName}
									placeholder="Имя"
									value={userName}
									onChange={(e): void => {
										paroleValidationError && setParoleValidationError(false);
										setUserName(e.target.value);
									}}
								/>
							</div>
							<div style={{ margin: '10px 0' }}>
								<Input
									error={paroleValidationError && !userParole}
									placeholder="Пароль"
									value={userParole}
									onChange={(e): void => {
										paroleValidationError && setParoleValidationError(false);
										wrongParoleError && setWrongParoleError(false);
										setUserParole(e.target.value);
									}}
								/>
							</div>
						</div>
					}
				/>
			)}
		</>
	);
};
