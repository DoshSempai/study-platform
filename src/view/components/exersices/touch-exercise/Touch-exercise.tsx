import React, { useState } from 'react';
import cn from 'classnames';
import './Touch-exercise.css';

interface ExerciseTouchProps {
	title: String;
	answer: String;
}

export const ExerciseTouch = ({ title, answer }: ExerciseTouchProps): JSX.Element => {
	return (
		<div className="exercise">
			<div className="exercise__title">{title}</div>
			<div className="exercise__question">{answer}</div>
			<div className="ex-touch__body-wrap">
				<div className="ex-touch__lines">
					<div className="ex-touch__line"></div>
					<div className="ex-touch__line"></div>
					<div className="ex-touch__line"></div>
				</div>
			</div>
		</div>
	);
};
