import React, { ReactNode } from 'react';
import { Content } from '../../components/content/Content';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';

interface CommonLayoutProps {
	children?: ReactNode;
	canLogin?: boolean;
	searchValue?: string;
	setSearchValue?: (data: string) => void;
	onCreateTestClick?: () => void;
}

export const CommonLayout = ({
	children,
	canLogin = false,
	onCreateTestClick,
	searchValue,
	setSearchValue,
}: CommonLayoutProps): JSX.Element => (
	<>
		<Navigation onCreateTestClick={onCreateTestClick} />
		<div className="app_right">
			<Header searchValue={searchValue} setSearchValue={setSearchValue} canLogin={canLogin} />
			<Content>{children}</Content>
		</div>
	</>
);
