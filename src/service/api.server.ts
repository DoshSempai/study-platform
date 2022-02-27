// import { ITestData } from '../data/dashboard-data';
import { ITestData } from '../data/dashboard-data';
import {
	ILoginProps,
	ILogin,
	IRegister,
	IRegisterProps,
	ITestRead,
	ITestReadInit,
	ICreate,
} from './api.server.interface';

export class ApiServer {
	static url = 'http://localhost:8000';
	static usersRoute = 'users';
	static testsRoute = 'tests';

	async login(data: ILoginProps): Promise<ILogin | null> {
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
			console.log(`login:`, result);
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

	async createTest(data: ITestData): Promise<ICreate | null> {
		try {
			const mappedData = {
				...data,
				parole: data.parole || null,
				test: JSON.stringify(data.test),
			};
			const response = await fetch(`${ApiServer.url}/${ApiServer.testsRoute}/tests`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mappedData),
			});
			console.log('[createTest] response', response);
			if (!response.ok) {
				return null;
			}
			const result = await response.json();
			console.log('[createTest] result', result);
			return {
				id: result.id,
				authorId: result.authorId,
				title: result.title,
			};
		} catch (e) {
			console.error('[API] (createTest)', e);
			return null;
		}
	}

	async readTests(): Promise<ITestData[]> {
		try {
			const response = await fetch(`${ApiServer.url}/${ApiServer.testsRoute}/tests`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				return [];
			}
			const jsonData = await response.json();
			const result = jsonData.tests as ITestReadInit[];
			console.log(`[readTests] result`, result);
			const typedRes: ITestData[] = result.map((el) => ({
				...el,
				parole: el.parole ?? undefined,
				test: JSON.parse(el.test),
			}));
			return typedRes;
		} catch (e) {
			console.error('[API] (readTests)', e);
			return [];
		}
	}
}
