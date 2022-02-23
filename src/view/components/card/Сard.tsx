import React from 'react';
import { DeleteIcon, SettingsIcon, StatisticsIcon } from '../../../assets/svg';
import './Card.css';

interface CardProps {
	title: String;
}

export const Card = ({ title }: CardProps): JSX.Element => {
	const handleActionClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.preventDefault();
		e.stopPropagation();
		console.log(`action !!`);
	};

	return (
		<div className="card">
			<div className="card__content">
				<div className="card__title">{title}</div>
				<div className="card__actions">
					<div className="card__action" onClick={handleActionClick}>
						<StatisticsIcon />
					</div>
					<div className="card__action" onClick={handleActionClick}>
						<SettingsIcon />
					</div>
					<div className="card__action" onClick={handleActionClick}>
						<DeleteIcon />
					</div>
				</div>
			</div>
			<div className="card__navigation"></div>
		</div>
	);
};
