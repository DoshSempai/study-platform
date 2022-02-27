import { createContext } from 'react';

export interface IAuthContext {
	id: number;
	email: string;
	authenticated: boolean;
}

export const AuthContext = createContext({
	authData: {
		authenticated: false,
		email: '',
		id: 0,
	} as IAuthContext,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setAuthData: (authData: IAuthContext) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
