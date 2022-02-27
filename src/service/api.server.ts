// import { ITestData } from '../data/dashboard-data';
import { ITestData } from '../data/dashboard-data';
import {
	ILoginProps,
	ILogin,
	IRegister,
	IRegisterProps,
	ITestReadInit,
	ICreate,
} from './api.server.interface';

export class ApiServer {
	static url = 'https://st-platform-server.herokuapp.com';
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
				results: JSON.stringify(data.results || []),
			};
			const response = await fetch(`${ApiServer.url}/${ApiServer.testsRoute}/tests`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mappedData),
			});
			if (!response.ok) {
				return null;
			}
			const result = await response.json();
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
			const typedRes: ITestData[] = result.map((el) => ({
				...el,
				parole: el.parole ?? undefined,
				test: JSON.parse(el.test),
				results: JSON.parse(el.results),
			}));
			return typedRes;
		} catch (e) {
			console.error('[API] (readTests)', e);
			return [];
		}
	}

	async updateTest(id: number, testData: ITestData): Promise<ICreate | null> {
		try {
			const mappedData = {
				id,
				test: {
					...testData,
					parole: testData.parole || null,
					test: JSON.stringify(testData.test),
					results: JSON.stringify(testData.results),
				},
			};
			const response = await fetch(`${ApiServer.url}/${ApiServer.testsRoute}/tests`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mappedData),
			});
			if (!response.ok) {
				return null;
			}
			const result = await response.json();
			return {
				id: result.id,
				authorId: result.authorId,
				title: result.title,
			};
		} catch (e) {
			console.error('[API] (updateTest)', e);
			return null;
		}
	}

	async deleteTest(id: number, testData: ITestData): Promise<ICreate | null> {
		try {
			const mappedData = {
				id,
				test: {
					...testData,
					parole: testData.parole || null,
					test: JSON.stringify(testData.test),
					results: JSON.stringify(testData.results),
				},
			};
			const response = await fetch(`${ApiServer.url}/${ApiServer.testsRoute}/tests`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mappedData),
			});
			if (!response.ok) {
				return null;
			}
			const result = await response.json();
			return {
				id: result.id,
				authorId: result.authorId,
				title: result.title,
			};
		} catch (e) {
			console.error('[API] (deleteTest)', e);
			return null;
		}
	}
}
