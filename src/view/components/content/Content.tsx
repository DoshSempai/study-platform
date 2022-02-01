import React, { ReactNode } from 'react';
import { Card } from '../card/Сard';
import './Content.css';

const cardCount = [1, 1, 1, 1, 1, 1, 1, 1];

interface ContentProps {
	children?: ReactNode;
}

export const Content = ({ children }: ContentProps): JSX.Element => (
	<div className="content">
		{children}
		{/* {cardCount.map((item) => (
			<Card key={item} title={} />
		))} */}
	</div>
);
