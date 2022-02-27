import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext, IAuthContext } from '../context/authContext';
import { Dashboard } from './pages/dashboard/dashboard';
import { Exercise } from './pages/exercise/Exercise';
import { Statistics } from './pages/statistics/statistics';
import './App.css';
import { ApiLocalStorage } from '../service/api.localstorage';

const App = (): JSX.Element => {
	const [api] = useState(new ApiLocalStorage());
	const [authData, setAuthData] = useState<IAuthContext>({
		id: 0,
		email: '',
		authenticated: false,
	});

	useEffect(() => {
		const savedUser = api.getUser();
		if (savedUser) {
			setAuthData(savedUser);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ authData, setAuthData }}>
			<div className="app">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/exercise" element={<Exercise />} />
					<Route path="/statistics" element={<Statistics />} />
					<Route element={<Dashboard />} />
				</Routes>
			</div>
		</AuthContext.Provider>
	);
};

export default App;
