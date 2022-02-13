import React, { ReactNode } from 'react';
import './Content.css';

interface ContentProps {
	children?: ReactNode;
}

export const Content = ({ children }: ContentProps): JSX.Element => (
	<div className="content">{children}</div>
);
