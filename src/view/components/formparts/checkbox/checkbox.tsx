import React from 'react';
import cn from 'classnames';
import './checkbox.css';

interface ICheckbox {
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	className?: string;
}

export const Checkbox = (props: ICheckbox): JSX.Element => {
	return (
		<div className={cn('st-checkbox', props.className)}>
			<input
				className="st-checkbox__input"
				type="checkbox"
				id={props.label}
				checked={props.checked}
				onChange={props.onChange}
			/>
			<label htmlFor={props.label}>{props.label}</label>
		</div>
	);
};
