import React from 'react';
import cn from 'classnames';
import './ResultHint.css';

interface IResultHint {
	onNextHandler: () => void;
	correctAnswer: string | JSX.Element;
	isAnswerCorrect: boolean;
}

const successHintTitles = ['Верно!', 'Потрясающе!', 'Супер!', 'Правильно!', 'Прекрасно!'];
const getSuccessHintTitle = (): string => {
	const successHintTitleIndex = Math.floor(Math.random() * successHintTitles.length);
	return successHintTitles[successHintTitleIndex];
};

export const ResultHint = ({
	correctAnswer,
	isAnswerCorrect,
	onNextHandler,
}: IResultHint): JSX.Element => {
	return (
		<div
			className={cn('ex-hint', {
				'ex-hint--correct': isAnswerCorrect === true,
				'ex-hint--wrong': isAnswerCorrect === false,
			})}
		>
			<div
				className={cn('ex-hint__title', {
					'ex-hint__title--correct': isAnswerCorrect === true,
					'ex-hint__title--wrong': isAnswerCorrect === false,
				})}
			>
				{isAnswerCorrect === true && getSuccessHintTitle()}
				{isAnswerCorrect === false && 'Правильный ответ:'}
			</div>
			{correctAnswer && (
				<div
					className={cn('ex-hint__sub-title', {
						'ex-hint__sub-title--correct': isAnswerCorrect === true,
						'ex-hint__sub-title--wrong': isAnswerCorrect === false,
					})}
				>
					{correctAnswer}
				</div>
			)}
			<div
				className={cn('ex-hint__button', {
					'ex-hint__button--correct': isAnswerCorrect === true,
					'ex-hint__button--wrong': isAnswerCorrect === false,
				})}
			>
				<button onClick={onNextHandler}>Продолжить</button>
			</div>
		</div>
	);
};
