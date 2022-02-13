import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ITestButtonExercise, testButtonExercise } from '../../../data/test-exercise';
import { CheckButton } from '../../components/checkbutton/CheckButton';
import { Content } from '../../components/content/Content';
import { ExerciseButton } from '../../components/exersices/button-exersice/Button-exersice';
import { ExerciseWrap } from '../../components/exersices/exercise-wrap/Exercise-wrap';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';
import { ProgressBar } from '../../components/progressbar/ProgressBar';

type TestMode = 'test' | 'train';

export const Exercise = (): JSX.Element => {
	const [mode, setMode] = useState<TestMode>();
	const [numberOfCorrect, setNumberOfCorrect] = useState<number>(0);
	const [userAnswer, setUserAnswer] = useState<String>();
	const [exerciseArray, setExerciseArray] =
		useState<Array<ITestButtonExercise>>(testButtonExercise);

	const currentExercise = exerciseArray[0] ?? null;
	const progressValue =
		(testButtonExercise.length - exerciseArray.length) / testButtonExercise.length;

	const handleCheckAnswer = (): void => {
		const isCorrect = userAnswer === currentExercise.answer;
		console.log(`userAnswer (${isCorrect})`, userAnswer);

		if (mode === 'test') {
			isCorrect && setNumberOfCorrect(numberOfCorrect + 1);
			const newExerciseArray = exerciseArray.slice(1);
			setExerciseArray(newExerciseArray);
			setUserAnswer(undefined);
		} else {
			const newExerciseArray = isCorrect
				? exerciseArray.slice(1)
				: [...exerciseArray.slice(1), exerciseArray[0]];
			setExerciseArray(newExerciseArray);
			setUserAnswer(undefined);
		}
	};

	const modeSelectionNode = (): JSX.Element => (
		<div>
			<div className="ex-button__title">Выберите режим:</div>
			<button
				className={cn('ex-button__button', {
					'ex-button__button--disabled': false,
				})}
				disabled={false}
				onClick={(): void => setMode('test')}
			>
				Тестирование
			</button>
			<button
				className={cn('ex-button__button', {
					'ex-button__button--disabled': false,
				})}
				disabled={false}
				onClick={(): void => setMode('train')}
			>
				Тренировка
			</button>
		</div>
	);

	return (
		<>
			<Navigation />
			<div className="app_right">
				<Header />
				<Content>
					{mode && <ProgressBar progressPercent={progressValue} />}
					<ExerciseWrap>
						{!mode && modeSelectionNode()}
						{mode && currentExercise && (
							<ExerciseButton
								key={`${currentExercise.question}-${currentExercise.answer}`}
								title={currentExercise.title}
								answer={currentExercise.answer}
								variants={currentExercise.variants}
								question={currentExercise.question}
								setUserAnswer={setUserAnswer}
							/>
						)}
						{mode && !currentExercise && (
							<div className="ex-button__title">
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
				</Content>
			</div>
		</>
	);
};
