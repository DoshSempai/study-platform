import React from 'react';
import { LockIcon } from '../../../assets/svg';
import './Card.css';

export interface ICardActionsMeta {
	icon: JSX.Element;
	action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface ICard {
	title: String;
	hasParole?: boolean;
	actionsMeta?: ICardActionsMeta[];
}

export const Card = ({ title, hasParole, actionsMeta }: ICard): JSX.Element => {
	return (
		<div className="card">
			<div className="card__content">
				<div className="card__title">
					{hasParole && (
						<span className="card__title-icon">
							<LockIcon />
						</span>
					)}
					{title}
				</div>
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
