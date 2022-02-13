import React, { useState } from 'react';
import { ITestButtonExercise, testButtonExercise } from '../../../data/test-exercise';
import { CheckButton } from '../../components/checkbutton/CheckButton';
import { Content } from '../../components/content/Content';
import { ExerciseButton } from '../../components/exersices/button-exersice/Button-exersice';
import { ExerciseWrap } from '../../components/exersices/exercise-wrap/Exercise-wrap';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';
import { ProgressBar } from '../../components/progressbar/ProgressBar';

export const Exercise = (): JSX.Element => {
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
					<ProgressBar progressPercent={progressValue} />
					<ExerciseWrap>
						{currentExercise && (
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
					{currentExercise && (
						<CheckButton
							text="Проверить"
							isReadyToCheck
							onCheck={(): void => {
								console.log(`userAnswer`, userAnswer);
								console.log(`is Correct`, userAnswer === currentExercise.answer);
								const newExerciseArray = exerciseArray.slice(1);
								setExerciseArray(newExerciseArray);
							}}
						/>
					)}
				</Content>
			</div>
		</>
	);
};
