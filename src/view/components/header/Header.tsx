import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = (): JSX.Element => (
	<div className="header">
		<Link to="/" className="stplatform-link">
			<div className="header__title">TestMe</div>
		</Link>
		<div className="header__settings">crimson15dream</div>
	</div>
);
