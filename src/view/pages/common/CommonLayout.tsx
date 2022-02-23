import React, { ReactNode } from 'react';
import { Content } from '../../components/content/Content';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';

interface CommonLayoutProps {
	children?: ReactNode;
	searchValue?: string;
	setSearchValue?: (data: string) => void;
	onCreateTestClick?: () => void;
}

export const CommonLayout = ({
	children,
	onCreateTestClick,
	searchValue,
	setSearchValue,
}: CommonLayoutProps): JSX.Element => (
	<>
		<Navigation onCreateTestClick={onCreateTestClick} />
		<div className="app_right">
			<Header searchValue={searchValue} setSearchValue={setSearchValue} />
			<Content>{children}</Content>
		</div>
	</>
);
