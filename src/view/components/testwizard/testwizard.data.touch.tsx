import React from 'react';
import { Button } from '../formparts/button/button';
import { ReactionEditor } from '../formparts/reactioneditor/reactioneditor';

export const TestWizardDataTouch = (): JSX.Element => {
	const actionBlock = (): JSX.Element => (
		<div className="testwizard__data_block-row testwizard__data_block-row--end testwizard__data_block-row--top-margin">
			<Button
				text="Превью"
				onClick={(e) => {
					console.log(`click`, e);
				}}
			/>
			<Button
				text="Сохранить задание в тесте"
				onClick={(e) => {
					console.log(`click`, e);
				}}
			/>
		</div>
	);

	return (
		<div className="testwizard__data_block">
			<div className="testwizard__data_block-row-label">Уравнение</div>
			<ReactionEditor placeholder="2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O" />
			{actionBlock()}
		</div>
	);
};
