import React, { useState } from 'react';
import cn from 'classnames';
import './Touch-exercise.css';
import { IChemicalReaction } from '../../../../data/chemistry/types';
import {
	generateAnswerTemplateArray,
	getListOfReactionParts,
	shuffleChemArray,
} from '../../../../data/chemistry/controls_ex_touch';

interface ExerciseTouchProps {
	title: String;
	answer: String;
	question: IChemicalReaction;
	setUserAnswer: (userAnswer: string) => void;
}

type ChosenElementsType = { el: string; index: string };

export const ExerciseTouch = ({
	title,
	question,
	setUserAnswer,
}: ExerciseTouchProps): JSX.Element => {
	const currentReaction = question; // reactionF
	const [initStableShuffle] = useState<Array<{ el: JSX.Element; index: string }>>(
		shuffleChemArray(
			getListOfReactionParts(currentReaction).map((el, idx) => ({ el: el, index: `${idx}` })),
		),
	);
	const [userAnswer, updateUserAnswer] = useState<ChosenElementsType[]>(
		generateAnswerTemplateArray(currentReaction).map((el) => ({ el: el, index: `${-1}` })),
	);
	const [chosenElements, setChosenElements] = useState<string[]>(
		generateAnswerTemplateArray(currentReaction),
	);

	// const generateContentTemplateLine = (): JSX.Element => {
	// 	return createReactionLine(currentReaction);
	// };

	const onClickAnswerBlock = (userAnswerIdx: number, userAnswerEl: ChosenElementsType): void => {
		if (userAnswerEl.el === '+' || userAnswerEl.el === '=' || userAnswerEl.el === '') {
			return;
		}

		const userAnswerCopy = [...userAnswer];
		const chosenElementsCopy = [...chosenElements];

		userAnswerCopy[userAnswerIdx] = { el: '', index: `${-1}` };
		chosenElementsCopy[Number(userAnswerEl.index)] = '';
		setChosenElements(chosenElementsCopy);
		updateUserAnswer(userAnswerCopy);
	};

	const answerBloc = (): JSX.Element => (
		<div className="ex-touch__blocks ex-touch__blocks--answers">
			{userAnswer.map((item, idx) => {
				const { el } = item;
				const numberPart: string | undefined = (el.match(/\d+/g) || [])[0];
				const letterPart: string | undefined = (el.match(/\D+/g) || [])[0];
				const elView =
					el === '+' || el === '=' ? (
						el // signs
					) : !letterPart ? (
						el // number
					) : numberPart ? (
						<>
							{letterPart}
							<sub>{numberPart}</sub>
						</>
					) : (
						<>{letterPart}</>
					);
				return (
					<div
						key={`${idx}${el}`}
						className={cn('ex-touch__answer-span', {
							'ex-touch__answer-span--onhover': el !== '+' && el !== '=',
							'ex-touch__answer-span--no-border': el === '+' || el === '=',
						})}
						onClick={(): void => onClickAnswerBlock(idx, item)}
					>
						{elView}
					</div>
				);
			})}
		</div>
	);

	const onClickQuestionBlock = (idx: number, key: string): void => {
		const userAnswerCopy = [...userAnswer];
		// ---------------------------
		let targetIndex = -1;
		userAnswerCopy.forEach((item, i) => {
			const el = item.el;
			if (targetIndex === -1 && el !== '+' && el !== '=' && el === '') {
				targetIndex = i;
			}
		});
		userAnswerCopy[targetIndex] = { el: key, index: `${idx}` };

		const chosenElementsCopy = [...chosenElements];
		chosenElementsCopy[idx] = key;
		setChosenElements(chosenElementsCopy);
		// ---------------------------
		updateUserAnswer(userAnswerCopy);

		// ===========================
		if (!chosenElementsCopy.includes('')) {
			setUserAnswer(
				`${chosenElementsCopy.join('') === userAnswerCopy.map((el) => el.el).join('')}`,
			);
		}
	};

	const questionBlocks = (): JSX.Element => (
		<div className="ex-touch__blocks">
			{initStableShuffle.map((item) => {
				const { el, index: elIndex } = item;
				if (el.key === '+' || el.key === '=') return null;
				return (
					<div key={`ex-touch__block-wrap--${elIndex}`} className="ex-touch__block-wrap">
						<div
							className={cn('ex-touch__block', {
								'ex-touch__block--hidden': chosenElements[Number(elIndex)] !== '',
							})}
							onClick={(): void => onClickQuestionBlock(Number(elIndex), el.key as string)}
						>
							{el}
						</div>
					</div>
				);
			})}
		</div>
	);

	return (
		<div className="exercise">
			<div className="exercise__title">{title}</div>
			<div className="ex-touch__body-wrap">
				<div className="ex-touch__answer_template_line">{answerBloc()}</div>
			</div>
			{questionBlocks()}
		</div>
	);
};
