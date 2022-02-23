import React from 'react';
import './Card.css';

interface ICardActionsMeta {
	icon: JSX.Element;
	action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface ICard {
	title: String;
	actionsMeta?: ICardActionsMeta[];
}

export const Card = ({ title, actionsMeta }: ICard): JSX.Element => {
	return (
		<div className="card">
			<div className="card__content">
				<div className="card__title">{title}</div>
				<div className="card__actions">
					{actionsMeta &&
						actionsMeta.map((meta, index) => (
							<div key={`actionMeta-${index}`} className="card__action" onClick={meta.action}>
								{meta.icon}
							</div>
						))}
				</div>
			</div>
			<div className="card__navigation"></div>
		</div>
	);
};
