import { ITestExerciseAll } from '../data/exercise-types';

export interface ILoginProps {
	email: string;
	password: string;
}

export interface ILogin {
	id: number;
	email: string;
	jwt: string;
}

export interface IRegisterProps {
	email: string;
	name: string;
	password: string;
}

export interface IRegister {
	id: number;
	email: string;
}

export interface ICreate {
	id: number;
	authorId: number;
	title: string;
}

export interface ITestReadTech {
	id: number;
	authorId: number;
	title: string;
	testMode: boolean;
	trainMode: boolean;
	parole: string | null;
}

export interface ITestReadInit extends ITestReadTech {
	test: string;
	results: string;
}

export interface ITestRead extends ITestReadTech {
	test: ITestExerciseAll[];
	results: string;
}
