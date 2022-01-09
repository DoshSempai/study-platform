import React from 'react';
import './App.css';
import { Header } from './header/Header';
import { Navigation } from './navigation/Navigation';
import { Content } from './content/Content';

const App = (): JSX.Element => (
	<div className="app">
		<Navigation />
		<div className="app_right">
			<Header />
			<Content />
		</div>
	</div>
);

export default App;
