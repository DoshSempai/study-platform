import React from 'react';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { ExerciseButton } from '../exersices/button-exersice/Button-exersice';
import { ExerciseTouch } from '../exersices/touch-exercise/Touch-exercise';

interface ITestWizardPreview {
	task: ITestExerciseAll;
}

const emptyFn = (): void => {
	/* noop */
};

export const TestWizardPreview = ({ task }: ITestWizardPreview): JSX.Element => {
	const getTask = (): JSX.Element => {
		switch (task.type) {
			case ExerciseType.button:
				return (
					<ExerciseButton
						key={`${task.question}-${task.answer}`}
						title={task.title}
						variants={task.variants}
						question={task.question}
						setUserAnswer={emptyFn}
					/>
				);
			case ExerciseType.touch:
				return (
					<ExerciseTouch
						key={`${task.type}`}
						notes={task.notes}
						title={task.title}
						answer={task.answer}
						question={task.question}
						setUserAnswer={emptyFn}
					/>
				);
		}
	};
	return (
		<div className="testwizard__preview-task-wrap">
			<div className="testwizard__preview-task">{getTask()}</div>
		</div>
	);
};
