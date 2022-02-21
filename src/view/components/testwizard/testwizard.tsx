import React, { useState } from 'react';
import { TestWizardSettingsCommon } from './testwizard.settings.common';
import { TestWizardSettingsTask } from './testwizard.settings.task';
import { TestWizardDataButton } from './testwizard.data.button';
import { TestWizardDataTouch } from './testwizard.data.touch';
import { TestWizardPreview } from './testwizard.preview';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { truncateString } from '../../../utils';
import './styles/testwizard.css';
import './styles/testwizard.header.css';
import './styles/testwizard.footer.css';
import './styles/testwizard.content.css';
import './styles/testwizard.tasklist.css';
import './styles/testwizard.settings.css';
import './styles/testwizard.data.css';
import './styles/testwizard.preview.css';
import { ITestCommonData, ITestData } from '../../../data/dashboard-data';

interface ITestWizard {
	onCloseModal?: () => void;
	onCreateTest: (data: ITestData) => void;
}

const typeMapper = {
	[ExerciseType.button]: 'Кнопки',
	[ExerciseType.touch]: 'Конструктор',
};

export const TestWizard = ({ onCloseModal, onCreateTest }: ITestWizard): JSX.Element => {
	const [counter, setCounter] = useState<number>(0);
	const [testSettings, setTestSettings] = useState<ITestCommonData>({
		title: '',
		testMode: true,
		trainMode: false,
	});
	const [settingsError, setSettingsError] = useState<boolean>();
	const [currentTaskType, setCurrentTaskType] = useState<ExerciseType>();
	const [currentTask, setCurrentTask] = useState<ITestExerciseAll>();
	const [tasks, setTasks] = useState<ITestExerciseAll[]>([]);

	const handleCreateTest = (): void => {
		console.log('- tasks & testSettings', tasks.length, testSettings);
		if (!testSettings || !testSettings.title) {
			setSettingsError(true);
			return;
		}
		if (!tasks.length) {
			return;
		}

		console.log('testSettings', testSettings);
		console.log('tasks', tasks);

		onCreateTest({
			...testSettings,
			test: tasks,
		});
	};

	const onCreateNewTask = (): void => {
		setCurrentTask(undefined);
		setCurrentTaskType(undefined);
		setCounter(counter + 1);
	};

	const onRemoveTask = (index: number): void => {
		const tasksCopy = [...tasks];
		tasksCopy.splice(index, 1);
		setTasks(tasksCopy);
	};

	const onOpenTaskSettings = (taskIndex: number): void => {
		const chosenTask = tasks[taskIndex];
		setCurrentTaskType(chosenTask.type);
		setCurrentTask(chosenTask);
		setCounter(counter + 1);
	};

	const onSetTypeInSettings = (type: ExerciseType): void => {
		setCurrentTask(undefined);
		setCurrentTaskType(type);
	};

	const onAddTaskToTest = (taskData: ITestExerciseAll): boolean => {
		if (!taskData) {
			return false;
		}
		setTasks([...tasks, taskData]);
		return true;
	};

	const listOfTasks = (): JSX.Element => (
		<div className="testwizard__exircise_list-wrap">
			<div className="testwizard__exircise_new" onClick={onCreateNewTask}>
				<div className="testwizard__exircise_new-logo"></div>
				<div className="testwizard__exircise_new-text">Задание</div>
			</div>
			<div className="testwizard__exircise_list-divider"></div>
			<div className="testwizard__exircise-list">
				{tasks.map((task, index) => (
					<div className="testwizard__list-item" onClick={(): void => onOpenTaskSettings(index)}>
						<div className="testwizard__list-item-data">
							<div className="testwizard__list-item-title">{truncateString(task.title, 16)}</div>
							<div className="testwizard__list-item-type">{typeMapper[task.type]}</div>
						</div>
						<div
							className="testwizard__list-item-remove"
							onClick={(e): void => {
								e.preventDefault();
								e.stopPropagation();
								onRemoveTask(index);
							}}
						></div>
					</div>
				))}
			</div>
		</div>
	);

	const settingsBlock = (): JSX.Element => (
		<div className="testwizard__setting">
			<TestWizardSettingsCommon
				settingsError={settingsError}
				removeError={(): void => setSettingsError(false)}
				testSettings={testSettings}
				setTestSettings={setTestSettings}
			/>
			<TestWizardSettingsTask key={`${counter}`} setType={onSetTypeInSettings} />
		</div>
	);

	const setTestDataHandler = (data: ITestExerciseAll): void => {
		setCounter(counter + 1);
		setCurrentTask(data);
	};

	const taskButtonBlock = (): JSX.Element => {
		switch (currentTaskType) {
			case ExerciseType.button:
				return <TestWizardDataButton setTestData={setTestDataHandler} addTask={onAddTaskToTest} />;
			case ExerciseType.touch:
				return <TestWizardDataTouch setTestData={setTestDataHandler} addTask={onAddTaskToTest} />;
			default:
				return <></>;
		}
	};

	return (
		<>
			<div className="testwizard-wrap"></div>
			<div className="testwizard">
				<div className="testwizard__header">
					<div className="testwizard__title">Создание нового теста</div>
					<div className="testwizard__close" onClick={onCloseModal}></div>
				</div>
				<div className="testwizard__content">
					<div className="testwizard__left">{listOfTasks()}</div>
					<div className="testwizard__right">
						{settingsBlock()}
						<div className="testwizard__data">
							<div className="testwizard__setting_part-title">Настройка данных задания</div>
							{taskButtonBlock()}
						</div>
						<div className="testwizard__preview">
							<div className="testwizard__setting_part-title">Превью задания</div>
							{currentTask && <TestWizardPreview key={`${counter}`} task={currentTask} />}
						</div>
					</div>
				</div>
				<div className="testwizard__footer">
					<div className="testwizard__action testwizard__action-cancel" onClick={onCloseModal}>
						Отмена
					</div>
					<div className="testwizard__action testwizard__action-create" onClick={handleCreateTest}>
						Создать
					</div>
				</div>
			</div>
		</>
	);
};
