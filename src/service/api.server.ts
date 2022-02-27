// import { ITestData } from '../data/dashboard-data';
import { ILoginProps, ILogin, IRegister, IRegisterProps } from './api.server.interface';

export class ApiServer {
	static url = 'http://localhost:8000';
	static usersRoute = 'users';
	static testsRoute = 'tests';

	async login(data: ILoginProps): Promise<ILogin | null> {
		// return fetch(`${ApiServer.url}/${ApiServer.usersRoute}/login`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		// })
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((result) => {
		// 		return {
		// 			id: result.id,
		// 			email: result.email,
		// 			jwt: result.jwt,
		// 		};
		// 	})
		// 	.catch((e) => {
		// 		console.error('[API] (login)', e);
		// 		return null;
		// 	});
		try {
			const response = await fetch(`${ApiServer.url}/${ApiServer.usersRoute}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				return null;
			}
			const result = await response.json();
			return {
				id: result.id,
				email: result.email,
				jwt: result.jwt,
			};
		} catch (e) {
			console.error('[API] (login)', e);
			return null;
		}
	}

	async register(data: IRegisterProps): Promise<IRegister | null> {
		try {
			const response = await fetch(`${ApiServer.url}/${ApiServer.usersRoute}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				return null;
			}
			const result = await response.json();
			return {
				id: result.id,
				email: result.email,
			};
		} catch (e) {
			console.error('[API] (register)', e);
			return null;
		}
	}
}
