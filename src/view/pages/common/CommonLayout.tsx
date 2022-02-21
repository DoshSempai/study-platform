import React, { ReactNode } from 'react';
import { Content } from '../../components/content/Content';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';

interface CommonLayoutProps {
	children?: ReactNode;
	onCreateTestClick?: () => void;
}

export const CommonLayout = ({ children, onCreateTestClick }: CommonLayoutProps): JSX.Element => (
	<>
		<Navigation onCreateTestClick={onCreateTestClick} />
		<div className="app_right">
			<Header />
			<Content>{children}</Content>
		</div>
	</>
);
