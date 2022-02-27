export interface ILoginProps {
	email: string;
	password: string;
}

export interface ILogin {
	id: string;
	email: string;
	jwt: string;
}

export interface IRegisterProps {
	email: string;
	name: string;
	password: string;
}

export interface IRegister {
	id: string;
	email: string;
}
