import { IChemicalReaction } from './chemistry/types';

export enum ExerciseType {
	button = 'button',
	touch = 'touch',
}

export interface ITestExercise {
	type: ExerciseType;
	title: string;
	answer: string;
}

export interface ITestExerciseButton extends ITestExercise {
	type: ExerciseType.button;
	question: string;
	variants: Array<string>;
}

export interface ITestExerciseTouch extends ITestExercise {
	type: ExerciseType.touch;
	question: IChemicalReaction;
}

export type ITestExerciseAll = ITestExerciseButton | ITestExerciseTouch;
