import React from 'react';
import { ReactionEditor } from '../formparts/reactioneditor/reactioneditor';

export const TestWizardDataTouch = (): JSX.Element => {
	return (
		<div className="testwizard__data_block">
			<div className="testwizard__data_block-row">
				<div className="testwizard__data_block-row-label">Уравнение</div>
				<ReactionEditor placeholder="Введите реакцию" />
			</div>
		</div>
	);
};
