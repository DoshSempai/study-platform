import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/dashboard';
import './App.css';
import { Navigation } from './components/navigation/Navigation';
import { Header } from './components/header/Header';
import { Content } from './components/content/Content';

const App = (): JSX.Element => (
	<div className="app">
		<Navigation />
		<div className="app_right">
			<Header />
			<Routes>
				<Route path="/" element={<Content />} />
				<Route path="/app" element={<Content />} />
				<Route path="/about" element={<Content />} />
				<Route element={<Content />} />
			</Routes>
		</div>
		{/* <Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/app" element={<Dashboard />} />
			<Route path="/about" element={<Dashboard />} />
			<Route element={<Dashboard />} />
		</Routes> */}
	</div>
);

export default App;
