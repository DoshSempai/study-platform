import { ITestData } from '../data/dashboard-data';

export class ApiLocalStorage {
	static storageName = 'st-storage';

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
