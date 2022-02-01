import React from 'react';
import { Content } from '../../components/content/Content';
import { ExerciseButton } from '../../components/exersices/button-exersice/Button-exersice';
import { ExerciseWrap } from '../../components/exersices/exercise-wrap/Exercise-wrap';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';

const Exercise = (): JSX.Element => (
	<>
		<Navigation />
		<div className="app_right">
			<Header />
			<Content>
				<ExerciseWrap>
					<ExerciseButton title={'Выберите правильный ответ'} question={'question'} />
				</ExerciseWrap>
			</Content>
		</div>
	</>
);

export { Exercise };
