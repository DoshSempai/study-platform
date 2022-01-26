import React from 'react';
import { Card } from '../card/Сard';
import './Content.css';

const cardCount = [1, 1, 1, 1, 1, 1, 1, 1];

export const Content = (): JSX.Element => (
	<div className="content">
		{cardCount.map((item) => (
			<Card />
		))}
	</div>
);
