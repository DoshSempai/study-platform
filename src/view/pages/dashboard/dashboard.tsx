import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, ICardActionsMeta } from '../../components/card/Сard';
import { dashboardTestLocalData, ITestCommonData, ITestData } from '../../../data/dashboard-data';
import { CommonLayout } from '../common/CommonLayout';
import { TestWizard } from '../../components/testwizard/testwizard';
import { DeleteIcon, SettingsIcon, StatisticsIcon } from '../../../assets/svg';
import { ActionModal } from '../../components/modal/modal';
import { Input } from '../../components/formparts/textinput/textinput';
import { AuthContext } from '../../../context/authContext';
import { ApiServer } from '../../../service/api.server';

export const Dashboard = (): JSX.Element => {
	const { authData } = useContext(AuthContext);

	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showTestWIzardModal, setShowTestWizardModal] = useState<boolean>(false);
	const [testList, setTestList] = useState<ITestData[]>(dashboardTestLocalData);
	const [searchValue, setSearchValue] = useState<string>('');
	const [apiServer] = useState(new ApiServer());

	// -------------------------
	const [chosenWizardTest, setChosenWizardTest] = useState<ITestData>();
	// -------------------------
	const [chosenParoledTest, setChosenParoledTest] = useState<ITestData>();
	const [userName, setUserName] = useState<string>('');
	const [userParole, setUserParole] = useState<string>('');
	const [wrongParoleError, setWrongParoleError] = useState<boolean>(false);
	const [paroleValidationError, setParoleValidationError] = useState<boolean>(false);
	const [showParoleModal, setShowParoleModal] = useState<boolean>(false);
	// -------------------------
	const navigate = useNavigate();

	const getCardActionsMetaData = ({
		selectedTestData,
	}: {
		selectedTestData: ITestData;
	}): ICardActionsMeta[] => {
		let metaData = [
			{
				icon: <SettingsIcon />,
				action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
					e.preventDefault();
					e.stopPropagation();
					setChosenWizardTest(selectedTestData);
					setShowTestWizardModal(true);
				},
			},
			{
				icon: <DeleteIcon />,
				action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
					e.preventDefault();
					e.stopPropagation();
					setChosenWizardTest(selectedTestData);
					setShowDeleteModal(true);
				},
			},
		];
		if (selectedTestData.parole) {
			metaData = [
				{
					icon: <StatisticsIcon />,
					action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
						e.preventDefault();
						e.stopPropagation();
						navigate('/statistics', {
							state: { data: selectedTestData },
						});
					},
				},
				...metaData,
			];
		}
		return metaData;
	};

	const updateList = async (): Promise<void> => {
		const serverData = await apiServer.readTests();

		setTestList([...testList, ...serverData].reverse());
	};

	useEffect(() => {
		updateList();
	}, []);

	const onCreateTest = async (data: ITestData): Promise<void> => {
		const sendData: ITestData = { ...data, parole: data.parole ?? undefined, results: [] };

		await apiServer.createTest(sendData);

		updateList();
		setShowTestWizardModal(false);
	};

	const onUpdateTest = async (data: ITestData): Promise<void> => {
		const sendData: ITestData = { ...data, parole: data.parole ?? undefined };

		if (!sendData.id) return;

		await apiServer.updateTest(sendData.id, { ...sendData, id: undefined });

		updateList();
		setShowTestWizardModal(false);
		setChosenWizardTest(undefined);
	};

	const onDeleteTest = async (): Promise<void> => {
		if (!chosenWizardTest) return;

		const id = chosenWizardTest?.id;
		const sendData: ITestData = {
			...chosenWizardTest,
			parole: chosenWizardTest.parole ?? undefined,
			id: undefined,
		};

		if (!id) return;

		await apiServer.deleteTest(id, sendData);

		updateList();
		setShowDeleteModal(false);
		setChosenWizardTest(undefined);
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
				onCreateTestClick={
					authData.authenticated ? (): void => setShowTestWizardModal(true) : undefined
				}
			>
				{testList
					.filter((el) => el.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
					.map((testData) => (
						<div onClick={(): void => handleNavigation(testData)}>
							<Card
								title={testData.title}
								hasParole={!!testData.parole}
								actionsMeta={
									authData.id === testData.authorId
										? getCardActionsMetaData({ selectedTestData: testData })
										: undefined
								}
							/>
						</div>
					))}
			</CommonLayout>
			{showTestWIzardModal && (
				<TestWizard
					mode={chosenWizardTest ? 'update' : 'create'}
					initTestData={chosenWizardTest ? chosenWizardTest.test : []}
					initTestSettings={
						chosenWizardTest
							? ({
									id: chosenWizardTest?.id,
									title: chosenWizardTest.title,
									testMode: chosenWizardTest.testMode,
									trainMode: chosenWizardTest.trainMode,
									parole: chosenWizardTest.parole,
							  } as ITestCommonData)
							: {
									title: '',
									testMode: true,
									trainMode: false,
									authorId: authData.id,
							  }
					}
					onCreateUpdateTest={chosenWizardTest ? onUpdateTest : onCreateTest}
					onCloseModal={(): void => {
						setShowTestWizardModal(false);
						setChosenWizardTest(undefined);
					}}
				/>
			)}
			{showDeleteModal && (
				<ActionModal
					title="Удаление теста"
					actionName="Удалить"
					content={
						<div className="delete-modal-body-text">
							Вы уверены, что хотите удалить тест "{chosenWizardTest?.title}"
						</div>
					}
					onClose={(): void => {
						setShowDeleteModal(false);
						setChosenWizardTest(undefined);
					}}
					onAction={onDeleteTest}
				/>
			)}
			{showParoleModal && (
				<ActionModal
					title="Введите имя и пароль"
					actionName="Войти"
					onClose={(): void => setShowParoleModal(false)}
					onAction={(): void => {
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
