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
	const [testMode, setTestMode] = useState<TestMode>();
	const [userAnswer, setUserAnswer] = useState<String>();
	const [exerciseArray, setExerciseArray] =
		useState<Array<ITestButtonExercise>>(testButtonExercise);

	const currentExercise = exerciseArray[0] ?? null;
	const progressValue =
		(testButtonExercise.length - exerciseArray.length) / testButtonExercise.length;

	return (
		<>
			<Navigation />
			<div className="app_right">
				<Header />
				<Content>
					{testMode && <ProgressBar progressPercent={progressValue} />}
					<ExerciseWrap>
						{!testMode && (
							<div>
								<div className="ex-button__title">Выберите режим:</div>
								<button
									className={cn('ex-button__button', {
										'ex-button__button--disabled': false,
									})}
									disabled={false}
									onClick={(): void => setTestMode('test')}
								>
									Тестирование
								</button>
								<button
									className={cn('ex-button__button', {
										'ex-button__button--disabled': true,
									})}
									disabled={true}
									onClick={(): void => setTestMode('train')}
								>
									Тренировка
								</button>
							</div>
						)}
						{testMode && currentExercise && (
							<ExerciseButton
								key={`${currentExercise.question}-${currentExercise.answer}`}
								title={currentExercise.title}
								answer={currentExercise.answer}
								variants={currentExercise.variants}
								question={currentExercise.question}
								setUserAnswer={setUserAnswer}
							/>
						)}
					</ExerciseWrap>
					{testMode && currentExercise && (
						<CheckButton
							text="Проверить"
							isReadyToCheck={!!userAnswer}
							onCheck={(): void => {
								console.log(`userAnswer`, userAnswer);
								console.log(`is Correct`, userAnswer === currentExercise.answer);
								const newExerciseArray = exerciseArray.slice(1);
								setExerciseArray(newExerciseArray);
								setUserAnswer(undefined);
							}}
						/>
					)}
					{testMode && !currentExercise && (
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
