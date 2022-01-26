import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './view/App';
import './reset.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('app'),
);

/**
render(<App />, document.getElementById('app'));
import React from 'react';
import { render } from 'react-dom';
import App from './view/App';
import './reset.css'; 
*/
