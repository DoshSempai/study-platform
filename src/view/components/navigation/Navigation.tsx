import React from 'react';
import './Navigation.css';

interface INavigation {
	onCreateTestClick?: () => void;
}

export const Navigation = ({ onCreateTestClick }: INavigation): JSX.Element => {
	const handleCreateClick = (): void => {
		onCreateTestClick?.();
	};
	return (
		<div className="navigation">
			<div className="navigation__item">
				<div className="navigation__create" onClick={handleCreateClick}></div>
			</div>
			{/* <div className="navigation__item"></div>
			<div className="navigation__item"></div> */}
		</div>
	);
};
