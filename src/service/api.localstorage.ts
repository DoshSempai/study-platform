import { IAuthContext } from '../context/authContext';
import { ITestData } from '../data/dashboard-data';

export class ApiLocalStorage {
	static storageName = 'st-storage';
	static storageUser = 'st-user';

	getUser(): IAuthContext | null {
		try {
			const jsonData = window.localStorage.getItem(ApiLocalStorage.storageUser);
			if (!jsonData) return null;
			return JSON.parse(jsonData);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	writeUser(data: IAuthContext): boolean {
		try {
			const json = JSON.stringify(data);
			window.localStorage.setItem(ApiLocalStorage.storageUser, json);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	getData(): ITestData[] {
		try {
			const jsonData = window.localStorage.getItem(ApiLocalStorage.storageName);
			if (!jsonData) return [];
			return JSON.parse(jsonData);
		} catch (e) {
			console.error(e);
			return [];
		}
	}

	writeData(data: ITestData): boolean {
		try {
			const currentList = this.getData();
			const newList = [...currentList, data];
			const json = JSON.stringify(newList);
			window.localStorage.setItem(ApiLocalStorage.storageName, json);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}
