import React, { useState } from 'react';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { parseHTMLReaction } from '../../../subjects/chemistry/parser';
import { Button } from '../formparts/button/button';
import { ReactionEditor } from '../formparts/reactioneditor/reactioneditor';

interface ITestWizardDataTouch {
	setTestData: (data: ITestExerciseAll) => void;
	addTask: () => boolean;
}

export const TestWizardDataTouch = ({
	setTestData,
	addTask,
}: ITestWizardDataTouch): JSX.Element => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const [reactionHTML, setReactionHTML] = useState<string>('');

	const handlePreviewClick = (): void => {
		const resReaction = parseHTMLReaction(reactionHTML);
		if (resReaction instanceof Error) {
			setErrorMessage('Ошибка в уравнении');
			return;
		}
		setTestData({
			type: ExerciseType.touch,
			title: 'Составьте реакцию',
			answer: '',
			question: resReaction,
		});
		console.log('preview', resReaction);
	};

	const handleAddTaskToTest = (): void => {
		const result = addTask();
		if (!result) {
			setErrorMessage('Заполните корректно все поля');
		}
	};

	const actionBlock = (): JSX.Element => (
		<div className="testwizard__data_block-row testwizard__data_block-row--end testwizard__data_block-row--top-margin">
			{errorMessage ? (
				<div className="testwizard__data_block-row__error">{errorMessage}</div>
			) : (
				<></>
			)}
			<Button text="Превью" onClick={handlePreviewClick} />
			<Button text="Сохранить задание в тесте" onClick={handleAddTaskToTest} />
		</div>
	);

	return (
		<div className="testwizard__data_block">
			<div className="testwizard__data_block-row-label">Уравнение</div>
			<ReactionEditor
				onInputHandler={(value) => {
					setReactionHTML(value);
				}}
				onFocusHandler={(): void => setErrorMessage(undefined)}
				placeholder="2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O"
			/>
			{actionBlock()}
		</div>
	);
};
