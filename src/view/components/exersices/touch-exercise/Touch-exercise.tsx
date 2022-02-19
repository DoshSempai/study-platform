import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import './Touch-exercise.css';
import { IChemicalReaction, reaction, reactionF } from '../../../../subjects/chemistry/types';
import {
	createReactionLine,
	generateAnswerTemplateArray,
	getListOfReactionParts,
} from '../../../../subjects/chemistry/controls_ex_touch';

interface ExerciseTouchProps {
	title: String;
	answer: String;
}

type ChosenElementsType = { el: string; index: string };

const shuffleArray = <T,>(arr: Array<T>): Array<T> => {
	// Тасование Фишера — Йетса
	const array = arr.slice();
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const shuffleArray2 = (
	arr: Array<{ el: JSX.Element; index: string }>,
	fixedEls: Array<string>,
): Array<{ el: JSX.Element; index: string }> => {
	const array = arr.slice();
	for (let i = array.length - 1; i > 0; i--) {
		if (fixedEls.includes(array[i].el.key as string)) continue;
		let j;
		do {
			j = Math.floor(Math.random() * (i + 1));
		} while (fixedEls.includes(array[j].el.key as string));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export const ExerciseTouch = ({ title, answer }: ExerciseTouchProps): JSX.Element => {
	const [initStableShuffle] = useState<Array<{ el: JSX.Element; index: string }>>(
		shuffleArray2(
			getListOfReactionParts(reaction).map((el, idx) => ({ el: el, index: `${idx}` })),
			['+', '='],
		),
	);
	const [userAnswer, setUserAnswer] = useState<ChosenElementsType[]>(
		generateAnswerTemplateArray(reaction).map((el) => ({ el: el, index: `${-1}` })),
	);
	const [chosenElements, setChosenElements] = useState<string[]>(
		generateAnswerTemplateArray(reaction),
	);

	const generateContentTemplateLine = (reaction: IChemicalReaction): JSX.Element => {
		return createReactionLine(reaction);
	};

	const onClickAnswerBlock = (userAnswerIdx: number, userAnswerEl: ChosenElementsType): void => {
		if (userAnswerEl.el === '+' || userAnswerEl.el === '=' || userAnswerEl.el === '') {
			return;
		}

		const userAnswerCopy = [...userAnswer];
		const chosenElementsCopy = [...chosenElements];

		userAnswerCopy[userAnswerIdx] = { el: '', index: `${-1}` };
		chosenElementsCopy[Number(userAnswerEl.index)] = '';
		setChosenElements(chosenElementsCopy);
		setUserAnswer(userAnswerCopy);
	};

	const answerBloc = (): JSX.Element => (
		<div className="ex-touch__blocks ex-touch__blocks--answers">
			{userAnswer.map((item, idx) => {
				const { el, index: elIndex } = item;
				const numberPart: string | undefined = (el.match(/\d+/g) || [])[0];
				const letterPart: string | undefined = (el.match(/[a-zA-Z]+/g) || [])[0];
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
						className="ex-touch__answer-span"
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
		setUserAnswer(userAnswerCopy);
	};

	const questionBlocks = (reaction: IChemicalReaction): JSX.Element => (
		<div className="ex-touch__blocks">
			{initStableShuffle.map((item, idx) => {
				const { el, index: elIndex } = item;
				if (el.key === '+' || el.key === '=') return null;
				return (
					<div key={`ex-touch__block-wrap--${elIndex}`} className="ex-touch__block-wrap">
						<div
							className={cn('ex-touch__block', {
								'ex-touch__block--hidden': chosenElements[Number(elIndex)] !== '', //!arrayOfActiveBottomBlocks[idx],
							})}
							// data-isactive={arrayOfActiveBottomBlocks[idx]}
							data-text={el.key}
							data-index={elIndex}
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
			<div className="exercise__question">{answer}</div>
			<div className="exercise__question">
				2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O
			</div>
			<div className="exercise__question">{generateContentTemplateLine(reaction)}</div>
			{/* <div className="exercise__question">{generateContentTemplateLine(reactionF)}</div> */}
			<div className="ex-touch__body-wrap">
				{/* <div className="ex-touch__lines">
					<div className="ex-touch__line"></div>
					<div className="ex-touch__line"></div>
					<div className="ex-touch__line"></div>
				</div> */}
				<div className="ex-touch__answer_template_line">{answerBloc()}</div>
			</div>
			{questionBlocks(reaction)}
			{/* {questionBlocks(reactionF)} */}
		</div>
	);
};
