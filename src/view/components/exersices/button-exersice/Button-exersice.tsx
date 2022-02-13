import React, { useState } from 'react';
// import classNames from 'classnames';
// import Button from '@vkontakte/vkui/dist/components/Button/Button';
// import LineWithTranslation from '../WordWithTranslation/LineWithTranslation';
import './Button-exersice.css';

const buttonData = ['Ответ 1', 'Ответ 2'];

interface ExerciseButtonProps {
	title: String;
	answer: String;
	question: String;
}

// const BigButton = ({ data, setAnswer, setReadyToCheck, isCheckClicked, setCorrectAnswer }) => {
export const ExerciseButton = ({ question, title, answer }: ExerciseButtonProps): JSX.Element => {
	// const { title, question, answer, variants, translations } = data;
	// const [clickedButton, setClickedButton] = useState(-1);
	// const [userAnswer, setUserAnswer] = useState('');
	// const [hasCheckClicked, setHasCheckClicked] = useState(false);

	return (
		<div className="ex-button">
			<div className="ex-button__title">{title}</div>
			<div className="ex-button__question">{question}</div>
			<div className="ex-button__body-wrap">
				{buttonData.map((el: any, idx: number) => (
					<button
						key={`BigButton-${idx}`}
						className="ex-button__button"
						// mode="outline"
						// size="xl"
						// data-id={idx}
						// onClick={handleClick}
					>
						{el}
					</button>
				))}
			</div>
		</div>
	);
};
