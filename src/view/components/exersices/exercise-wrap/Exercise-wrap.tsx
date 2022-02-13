import React, { ReactNode } from 'react';
import './Exercise-wrap.css';

interface ExerciseWrapProps {
	children?: ReactNode;
}

export const ExerciseWrap = ({ children }: ExerciseWrapProps): JSX.Element => (
	<div className="exercisewrap">{children}</div>
);
