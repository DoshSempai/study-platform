import React, { ReactNode } from 'react';
import { Content } from '../../components/content/Content';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';

interface CommonLayoutProps {
	children?: ReactNode;
}

export const CommonLayout = ({ children }: CommonLayoutProps): JSX.Element => (
	<>
		<Navigation />
		<div className="app_right">
			<Header />
			<Content>{children}</Content>
		</div>
	</>
);
