import React, { useState } from 'react';
import cn from 'classnames';
import './Button-exersice.css';

interface ExerciseButtonProps {
	title: string;
	question: string;
	variants: string[];
	setUserAnswer: (userAnswer: string) => void;
}

export const ExerciseButton = ({
	question,
	title,
	variants,
	setUserAnswer,
}: ExerciseButtonProps): JSX.Element => {
	const [chosenButtonIndex, setClickedButton] = useState(-1);

	const handleClick = (index: number): void => {
		setClickedButton(index);
		setUserAnswer(variants[index]);
	};

	return (
		<div className="exercise">
			<div className="exercise__title">{title}</div>
			<div className="exercise__question">{question}</div>
			<div className="ex-button__body-wrap">
				{variants.map((el: any, idx: number) => (
					<button
						key={`exButton-${idx}`}
						className={cn('ex-button__button', {
							'ex-button__button--active': chosenButtonIndex === idx,
						})}
						onClick={(): void => handleClick(idx)}
					>
						{el}
					</button>
				))}
			</div>
		</div>
	);
};
