import React from 'react';
import './button.css';

interface IButton {
	text: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ text, onClick }: IButton): JSX.Element => {
	return (
		<div className="st-button-wrap">
			<button className="st-button" onClick={onClick}>
				{text}
			</button>
		</div>
	);
};
