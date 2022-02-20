import React from 'react';
import { ReactionEditor } from '../formparts/reactioneditor/reactioneditor';

export const TestWizardDataTouch = (): JSX.Element => {
	return (
		<div className="testwizard__data_block">
			<div className="testwizard__data_block-row-label">Уравнение</div>
			<ReactionEditor placeholder="2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O" />
		</div>
	);
};
