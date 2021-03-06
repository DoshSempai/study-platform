import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { CheckButton } from '../../components/checkbutton/CheckButton';
import { ExerciseButton } from '../../components/exersices/button-exersice/Button-exersice';
import { ExerciseWrap } from '../../components/exersices/exercise-wrap/Exercise-wrap';
import { ProgressBar } from '../../components/progressbar/ProgressBar';
import { CommonLayout } from '../common/CommonLayout';
import { ResultHint } from '../../components/resultHint/ResultHint';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { ExerciseTouch } from '../../components/exersices/touch-exercise/Touch-exercise';
import { ITestData } from '../../../data/dashboard-data';
import { createReactionLine } from '../../../data/chemistry/controls_ex_touch';
import { ApiServer } from '../../../service/api.server';

type TestMode = 'test' | 'train';

export const Exercise = (): JSX.Element => {
	const { state } = useLocation();
	const locationData = (state as any).data as ITestData;
	const userName = (state as any).userName as string;
	const { test, testMode, trainMode, parole } = locationData;
	const initialExerciseList = test || [];

	const [apiServer] = useState(new ApiServer());
	const [counter, setCounter] = useState<number>(0);
	const [mode, setMode] = useState<TestMode>();
	const [numberOfCorrect, setNumberOfCorrect] = useState<number>(0);
	const [userAnswer, setUserAnswer] = useState<string>();
	const [hintVisible, showHint] = useState<boolean>(false);
	const [exerciseArray, setExerciseArray] = useState<Array<ITestExerciseAll>>(initialExerciseList);

	const currentExercise = exerciseArray[0] ?? null;
	const progressValue =
		(initialExerciseList.length - exerciseArray.length) / initialExerciseList.length;

	const handleCheckAnswer = (): void => {
		if (mode === 'train') {
			showHint(true);
			return;
		}

		const isCorrect = getIsAnswerCorrect();
		const newNumOfCorrect = isCorrect ? numberOfCorrect + 1 : numberOfCorrect;
		isCorrect && setNumberOfCorrect(newNumOfCorrect);

		const newExerciseArray = exerciseArray.slice(1);
		setCounter(counter + 1);
		setExerciseArray(newExerciseArray);
		setUserAnswer(undefined);

		if (!newExerciseArray.length && mode === 'test' && parole && userName) {
			const resultData = {
				name: userName,
				result: `${newNumOfCorrect} / ${initialExerciseList.length}`,
			};
			const newSendData: ITestData = {
				...locationData,
				results: [...(locationData.results || []), resultData],
			};
			onUpdateTestResults(newSendData);
		}
	};

	const onUpdateTestResults = async (data: ITestData): Promise<void> => {
		const sendData: ITestData = { ...data, parole: data.parole ?? undefined };
		if (!sendData.id) return;
		await apiServer.updateTest(sendData.id, { ...sendData, id: undefined });
	};

	const handleHintNextExercise = (): void => {
		const isCorrect = getIsAnswerCorrect();
		const newExerciseArray = isCorrect
			? exerciseArray.slice(1)
			: [...exerciseArray.slice(1), exerciseArray[0]];
		setCounter(counter + 1);
		setExerciseArray(newExerciseArray);
		setUserAnswer(undefined);
		showHint(false);
	};

	const modeSelectionStep = (): JSX.Element => (
		<div>
			<div className="exercise__title">???????????????? ??????????:</div>
			<button
				className={cn('ex-button__button', {
					'ex-button__button--disabled': !testMode,
				})}
				disabled={!testMode}
				onClick={(): void => setMode('test')}
			>
				????????????????????????
			</button>
			<button
				className={cn('ex-button__button', {
					'ex-button__button--disabled': !trainMode,
				})}
				disabled={!trainMode}
				onClick={(): void => setMode('train')}
			>
				????????????????????
			</button>
		</div>
	);

	const getExerciseItem = (): JSX.Element => {
		switch (currentExercise.type) {
			case ExerciseType.button:
				return (
					<ExerciseButton
						key={`${currentExercise.question}-${currentExercise.answer}-${counter}`}
						title={currentExercise.title}
						variants={currentExercise.variants}
						question={currentExercise.question}
						setUserAnswer={setUserAnswer}
					/>
				);
			case ExerciseType.touch:
				return (
					<ExerciseTouch
						key={`${currentExercise.type}-${counter}`}
						notes={currentExercise.notes}
						title={currentExercise.title}
						answer={currentExercise.answer}
						question={currentExercise.question}
						setUserAnswer={setUserAnswer}
					/>
				);
		}
	};

	const getIsAnswerCorrect = (): boolean => {
		switch (currentExercise.type) {
			case ExerciseType.button:
				return userAnswer === currentExercise.answer;
			case ExerciseType.touch:
				return JSON.parse(userAnswer ?? 'false') as boolean;
		}
	};

	const getCorrectAnswer = (): string | JSX.Element => {
		switch (currentExercise.type) {
			case ExerciseType.button:
				return currentExercise.answer;
			case ExerciseType.touch:
				return createReactionLine(currentExercise.question);
		}
	};

	return (
		<CommonLayout>
			{mode && <ProgressBar progressPercent={progressValue} />}
			<ExerciseWrap disabled={hintVisible}>
				{!mode && modeSelectionStep()}
				{mode && currentExercise && getExerciseItem()}
				{mode && !currentExercise && (
					<div className="exercise__title">
						{mode === 'test'
							? `??????????????????: ${numberOfCorrect} / ${initialExerciseList.length}`
							: '???????????????????? ??????????????????'}
					</div>
				)}
			</ExerciseWrap>
			{mode && currentExercise && (
				<CheckButton
					text={mode === 'test' ? '????????????????????' : '??????????????????'}
					isReadyToCheck={!!userAnswer}
					onCheck={handleCheckAnswer}
				/>
			)}
			{mode === 'train' && currentExercise && hintVisible && (
				<ResultHint
					isAnswerCorrect={getIsAnswerCorrect()}
					correctAnswer={getCorrectAnswer()}
					onNextHandler={handleHintNextExercise}
				/>
			)}
			{(!mode || (mode && !currentExercise)) && (
				<Link to="/" className="stplatform-link">
					<CheckButton
						text="???? ??????????????"
						isReadyToCheck
						onCheck={(): void => {
							/* noop */
						}}
					/>
				</Link>
			)}
		</CommonLayout>
	);
};
