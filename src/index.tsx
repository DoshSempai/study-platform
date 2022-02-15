import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './view/App';
import './reset.css';
import './common.css';

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('app'),
);
