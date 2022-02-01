import React from 'react';
import './Card.css';

interface CardProps {
	title: String;
}

export const Card = ({ title }: CardProps): JSX.Element => (
	<div className="card">
		<div className="card__content">
			<div className="card__title">{title}</div>
		</div>
		<div className="card__navigation"></div>
	</div>
);
