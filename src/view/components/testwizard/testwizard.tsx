import React, { useState } from 'react';
import { ITestExerciseAll } from '../../../data/exercise-types';
import { exerciseList } from '../../../data/test-exercise';
import { truncateString } from '../../../utils';
import './testwizard.css';

interface ITestWizard {
	onCloseModal?: () => void;
}

export const TestWizard = ({ onCloseModal }: ITestWizard): JSX.Element => {
	// const [tasks, setTasks] = useState<ITestExerciseAll[]>([]);
	const [tasks, setTasks] = useState<ITestExerciseAll[]>(exerciseList['1']);

	const onCreateNewTask = (): void => {
		/* todo */
	};

	const onRemoveTask = (index: number): void => {
		const tasksCopy = [...tasks];
		tasksCopy.splice(index, 1);
		setTasks(tasksCopy);
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
					<div className="testwizard__left">
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
											<div className="testwizard__list-item-title">
												{truncateString(task.title, 16)}
											</div>
											<div className="testwizard__list-item-type">{task.type}</div>
										</div>
										<div
											className="testwizard__list-item-remove"
											onClick={(): void => onRemoveTask(index)}
										></div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="testwizard__right">
						<div className="testwizard__setting"></div>
						<div className="testwizard__data"></div>
						<div className="testwizard__preview"></div>
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
