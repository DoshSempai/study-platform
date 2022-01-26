import React from 'react';
import './Card.css';

export const Card = (): JSX.Element => (
	<div className="card">
		<div className="card__content">
			<div className="card__title">нормальный заголовок</div>
		</div>
		<div className="card__navigation"></div>
	</div>
);
