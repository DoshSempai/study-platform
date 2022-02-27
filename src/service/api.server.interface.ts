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
