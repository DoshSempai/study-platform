import React from 'react';
import './ProgressBar.css';

interface IProgressBarProps {
	progressPercent: number;
}

export const ProgressBar = ({ progressPercent }: IProgressBarProps): JSX.Element => {
	const barWidthInPercent: number =
		(progressPercent < 0 ? 0 : progressPercent > 1 ? 1 : progressPercent) * 100;
	return (
		<div className="progress-bar-wrap">
			<div className="progress-bar-outer">
				<div className="progress-bar" style={{ width: `${barWidthInPercent}%` }}></div>
			</div>
		</div>
	);
};
