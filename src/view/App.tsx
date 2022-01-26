import React from 'react';
import './App.css';
import { Header } from './header/Header';
import { Navigation } from './navigation/Navigation';
import { Content } from './content/Content';
import { Routes, Route, Link } from 'react-router-dom';

const Temp = (): JSX.Element => (
	<>
		<Navigation />
		<div className="app_right">
			<Header />
			<Content />
		</div>
	</>
);

const App = (): JSX.Element => (
	<div className="app">
		<Routes>
			<Route path="/" element={<Temp />} />
			<Route path="/add" element={<Temp />} />
		</Routes>
	</div>
);

export default App;
