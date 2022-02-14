import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { testButtonExercise } from '../../../data/test-exercise';
import { CheckButton } from '../../components/checkbutton/CheckButton';
import { ExerciseButton } from '../../components/exersices/button-exersice/Button-exersice';
import { ExerciseWrap } from '../../components/exersices/exercise-wrap/Exercise-wrap';
import { ProgressBar } from '../../components/progressbar/ProgressBar';
import { CommonLayout } from '../common/CommonLayout';
import { ResultHint } from '../../components/resultHint/ResultHint';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { ExerciseTouch } from '../../components/exersices/touch-exercise/Touch-exercise';

type TestMode = 'test' | 'train';

// TODO: remove
const CAN_DO_TEST_TEMP = true;
const CAN_DO_TRAIN_TEMP = true;

export const Exercise = (): JSX.Element => {
	const [mode, setMode] = useState<TestMode>();
	const [numberOfCorrect, setNumberOfCorrect] = useState<number>(0);
	const [userAnswer, setUserAnswer] = useState<String>();
	const [hintVisible, showHint] = useState<boolean>(false);
	const [exerciseArray, setExerciseArray] = useState<Array<ITestExerciseAll>>(testButtonExercise);

	const currentExercise = exerciseArray[0] ?? null;
	const progressValue =
		(testButtonExercise.length - exerciseArray.length) / testButtonExercise.length;

	const handleCheckAnswer = (): void => {
		if (mode === 'train') {
			showHint(true);
			return;
		}

		const isCorrect = userAnswer === currentExercise.answer;
		isCorrect && setNumberOfCorrect(numberOfCorrect + 1);
		const newExerciseArray = exerciseArray.slice(1);
		setExerciseArray(newExerciseArray);
		setUserAnswer(undefined);
	};

	const handleHintNextExercise = (): void => {
		const isCorrect = userAnswer === currentExercise.answer;
		const newExerciseArray = isCorrect
			? exerciseArray.slice(1)
			: [...exerciseArray.slice(1), exerciseArray[0]];
		setExerciseArray(newExerciseArray);
		setUserAnswer(undefined);
		showHint(false);
	};

	const modeSelectionNode = (): JSX.Element => (
		<div>
			<div className="exercise__title">Выберите режим:</div>
			<button
				className={cn('ex-button__button', {
					'ex-button__button--disabled': !CAN_DO_TEST_TEMP,
				})}
				disabled={!CAN_DO_TEST_TEMP}
				onClick={(): void => setMode('test')}
			>
				Тестирование
			</button>
			<button
				className={cn('ex-button__button', {
					'ex-button__button--disabled': !CAN_DO_TRAIN_TEMP,
				})}
				disabled={!CAN_DO_TRAIN_TEMP}
				onClick={(): void => setMode('train')}
			>
				Тренировка
			</button>
		</div>
	);

	const getExerciseItem = (): JSX.Element => {
		switch (currentExercise.type) {
			case ExerciseType.button:
				return (
					<ExerciseButton
						key={`${currentExercise.question}-${currentExercise.answer}`}
						title={currentExercise.title}
						variants={currentExercise.variants}
						question={currentExercise.question}
						setUserAnswer={setUserAnswer}
					/>
				);
			case ExerciseType.touch:
				return (
					<ExerciseTouch
						key={`${currentExercise.answer}`}
						title={currentExercise.title}
						answer={currentExercise.answer}
					/>
				);
		}
	};

	return (
		<CommonLayout>
			{mode && <ProgressBar progressPercent={progressValue} />}
			<ExerciseWrap disabled={hintVisible}>
				{!mode && modeSelectionNode()}
				{mode && currentExercise && getExerciseItem()}
				{mode && !currentExercise && (
					<div className="exercise__title">
						{mode === 'test'
							? `Результат: ${numberOfCorrect} / ${testButtonExercise.length}`
							: 'Тренировка выполнена'}
					</div>
				)}
			</ExerciseWrap>
			{mode && currentExercise && (
				<CheckButton
					text={mode === 'test' ? 'Продолжить' : 'Проверить'}
					isReadyToCheck={!!userAnswer}
					onCheck={handleCheckAnswer}
				/>
			)}
			{mode === 'train' && currentExercise && hintVisible && (
				<ResultHint
					isAnswerCorrect={userAnswer === currentExercise.answer}
					correctAnswer={currentExercise.answer}
					onNextHandler={handleHintNextExercise}
				/>
			)}
			{mode && !currentExercise && (
				<Link to="/" className="stplatform-link">
					<CheckButton
						text="На главную"
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
