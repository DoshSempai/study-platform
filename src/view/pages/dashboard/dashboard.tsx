import React from 'react';
import { Content } from '../../components/content/Content';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';

const Dashboard = (): JSX.Element => (
	<>
		<Navigation />
		<div className="app_right">
			<Header />
			<Content />
		</div>
	</>
);

export { Dashboard };
