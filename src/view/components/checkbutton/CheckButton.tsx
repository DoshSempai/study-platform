import React from 'react';
import cn from 'classnames';
import './CheckButton.css';

interface ICheckButton {
	text?: String;
	onCheck: () => void;
	isReadyToCheck: boolean;
}

export const CheckButton = ({
	text = 'Продолжить',
	onCheck,
	isReadyToCheck,
}: ICheckButton): JSX.Element => {
	const onClick = (): void => {
		if (!isReadyToCheck) return;
		onCheck();
	};
	return (
		<div className="ex-check">
			<div
				className={cn('ex-check__button', {
					'ex-check__button--ready': isReadyToCheck === true,
					'ex-check__button--not-ready': isReadyToCheck === false,
				})}
			>
				<button onClick={onClick}>{text}</button>
			</div>
		</div>
	);
};
