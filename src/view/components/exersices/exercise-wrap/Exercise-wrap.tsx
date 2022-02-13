import React, { ReactNode } from 'react';
import cn from 'classnames';
import './Exercise-wrap.css';

interface ExerciseWrapProps {
	disabled?: boolean;
	children?: ReactNode;
}

export const ExerciseWrap = ({ children, disabled = false }: ExerciseWrapProps): JSX.Element => (
	<div
		className={cn('exercisewrap', {
			'exercisewrap--disabled': disabled,
		})}
	>
		{children}
	</div>
);
