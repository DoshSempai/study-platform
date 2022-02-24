import React, { useState } from 'react';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { parseHTMLReaction } from '../../../data/chemistry/parser';
import { Button } from '../formparts/button/button';
import { ReactionEditor } from '../formparts/reactioneditor/reactioneditor';
import { Input } from '../formparts/textinput/textinput';

interface ITestWizardDataTouch {
	setTestData: (data: ITestExerciseAll) => void;
	addTask: (data: ITestExerciseAll) => boolean;
}

export const TestWizardDataTouch = ({
	setTestData,
	addTask,
}: ITestWizardDataTouch): JSX.Element => {
	const [notes, setNotes] = useState<string>('');
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
			notes: notes || undefined,
			question: resReaction,
		});
		console.log('preview', resReaction);
	};

	const handleAddTaskToTest = (): void => {
		const resReaction = parseHTMLReaction(reactionHTML);
		if (resReaction instanceof Error) {
			setErrorMessage('Ошибка в уравнении');
			return;
		}
		const result = addTask({
			type: ExerciseType.touch,
			title: 'Составьте реакцию',
			answer: '',
			notes: notes || undefined,
			question: resReaction,
		});
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
			<div>
				<div className="testwizard__data_block-row-label">
					Пояснения{' '}
					<span className="testwizard__data_block-row-label--optional">(не обязательно)</span>
				</div>
				<Input
					className="testwizard__data_block-row-control testwizard__data_block-row-control--offset"
					value={notes}
					placeholder="пояснение..."
					onChange={(e): void => {
						errorMessage && setErrorMessage(undefined);
						setNotes(e.target.value);
					}}
				/>
			</div>
			<div>
				<div className="testwizard__data_block-row-label">Уравнение</div>
				<ReactionEditor
					onInputHandler={(value): void => {
						setReactionHTML(value);
					}}
					onFocusHandler={(): void => setErrorMessage(undefined)}
					placeholder="2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O"
				/>
			</div>
			{actionBlock()}
		</div>
	);
};
