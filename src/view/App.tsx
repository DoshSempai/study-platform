import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Exercise } from './pages/exercise/Exercise';
import './App.css';

const App = (): JSX.Element => (
	<div className="app">
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/exercise" element={<Exercise />} />
			<Route element={<Dashboard />} />
		</Routes>
	</div>
);

export default App;
