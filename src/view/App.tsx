import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Dashboard } from './pages/dashboard/Dashboard';
import { Dashboard } from './pages/dashboard/Dashboard';
import './App.css';
import { Navigation } from './components/navigation/Navigation';
import { Header } from './components/header/Header';
import { Content } from './components/content/Content';
import { Exercise } from './pages/exercise/Exercise';

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
