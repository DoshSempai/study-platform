import React from 'react';
import './App.css';
import { Header } from './header/Header';
import { Navigation } from './navigation/Navigation';

const App = (): JSX.Element => (
	<div className="app">
		<Navigation />
		<Header />
	</div>
);

export default App;
