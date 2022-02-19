import React, { useState } from 'react';
import Select from 'react-select';
import { Checkbox } from '../formparts/checkbox/checkbox';
import { Input } from '../formparts/textinput/textinput';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { exerciseList } from '../../../data/test-exercise';
import { truncateString } from '../../../utils';
import './styles/testwizard.css';
import './styles/testwizard.header.css';
import './styles/testwizard.footer.css';
import './styles/testwizard.content.css';
import './styles/testwizard.tasklist.css';
import './styles/testwizard.settings.css';
import './styles/testwizard.data.css';
import './styles/testwizard.preview.css';
import { TestWizardPreview } from './testwizard.preview';
import { TestWizardDataButton } from './testwizard.data';

interface ITestWizard {
	onCloseModal?: () => void;
}

const typeMapper = {
	[ExerciseType.button]: 'Кнопки',
	[ExerciseType.touch]: 'Конструктор',
};

const typeOptions = [
	{ value: ExerciseType.button, label: 'Кнопки' },
	{ value: ExerciseType.touch, label: 'Конструктор' },
];

export const TestWizard = ({ onCloseModal }: ITestWizard): JSX.Element => {
	// const [tasks, setTasks] = useState<ITestExerciseAll[]>([]);
	const [tasks, setTasks] = useState<ITestExerciseAll[]>(exerciseList['3']);
	const tempCurrentTask = tasks[0];

	const onCreateNewTask = (): void => {
		/* todo */
	};

	const onRemoveTask = (index: number): void => {
		const tasksCopy = [...tasks];
		tasksCopy.splice(index, 1);
		setTasks(tasksCopy);
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
					<div className="testwizard__list-item">
						<div className="testwizard__list-item-data">
							<div className="testwizard__list-item-title">{truncateString(task.title, 16)}</div>
							<div className="testwizard__list-item-type">{typeMapper[task.type]}</div>
						</div>
						<div
							className="testwizard__list-item-remove"
							onClick={(): void => onRemoveTask(index)}
						></div>
					</div>
				))}
			</div>
		</div>
	);

	const settingsBlock = (): JSX.Element => (
		<div className="testwizard__setting">
			<div className="testwizard__setting_part">
				<div className="testwizard__setting_part-title">Общие настройки теста</div>
				<Input
					className="testwizard__setting_checkbox"
					value={''}
					placeholder="Название теста"
					onChange={(e): void => {
						console.log(`input`, e);
					}}
				/>
				<Checkbox
					className="testwizard__setting_checkbox"
					checked={false}
					label="Разрешить режим тестирования"
					onChange={(e): void => {
						console.log(`check`, e);
					}}
				/>
				<Checkbox
					className="testwizard__setting_checkbox"
					checked={false}
					label="Разрешить режим тренировки"
					onChange={(e): void => {
						console.log(`check`, e);
					}}
				/>
				<Checkbox
					className="testwizard__setting_checkbox"
					checked={false}
					label="Закрыть доступ паролем"
					onChange={(e): void => {
						console.log(`check`, e);
					}}
				/>
				<Input
					value={'as'}
					placeholder="Пароль"
					onChange={(e): void => {
						console.log(`input`, e);
					}}
				/>
			</div>
			<div className="testwizard__setting_part">
				<div className="testwizard__setting_part-title">Настройки задания</div>
				<Select
					placeholder="Тип задания"
					options={typeOptions}
					// value={}
					onChange={(val): void => {
						console.log(`val`, val);
					}}
					styles={{
						// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
						control: (provided, state) => ({
							...provided,
							borderColor: state.isFocused ? '#56D1BB !important' : '#cccccc',
							boxShadow: state.isFocused ? '0 0 0 1px #56D1BB' : 'none',
						}),
					}}
				/>
			</div>
		</div>
	);

	const taskButtonDataBlock = (): JSX.Element => <TestWizardDataButton />;

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
							{taskButtonDataBlock()}
						</div>
						<div className="testwizard__preview">
							<div className="testwizard__setting_part-title">Превью задания</div>
							{tempCurrentTask && <TestWizardPreview task={tempCurrentTask} />}
						</div>
					</div>
				</div>
				<div className="testwizard__footer">
					<div className="testwizard__action testwizard__action-cancel" onClick={onCloseModal}>
						Отмена
					</div>
					<div className="testwizard__action testwizard__action-create">Создать</div>
				</div>
			</div>
		</>
	);
};
