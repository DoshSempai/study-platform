import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/dashboard';
import { Exercise } from './pages/exercise/Exercise';
import { Statistics } from './pages/statistics/statistics';
import './App.css';

const App = (): JSX.Element => (
	<div className="app">
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/exercise" element={<Exercise />} />
			<Route path="/statistics" element={<Statistics />} />
			<Route element={<Dashboard />} />
		</Routes>
	</div>
);

export default App;
