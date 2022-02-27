import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext, IAuthContext } from '../context/authContext';
import { Dashboard } from './pages/dashboard/dashboard';
import { Exercise } from './pages/exercise/Exercise';
import { Statistics } from './pages/statistics/statistics';
import './App.css';

const App = (): JSX.Element => {
	const [authData, setAuthData] = useState<IAuthContext>({
		id: 0,
		email: '',
		authenticated: false,
	});
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
