import React from 'react';
import cn from 'classnames';
import './textinput.css';

interface IInput {
	value: string;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	disabled?: boolean;
	className?: string;
}

export const Input = ({
	value,
	onChange,
	label,
	disabled,
	className = '',
	placeholder = '',
}: IInput): JSX.Element => {
	return (
		<div className={cn('st-input-wrap', className)}>
			{label && <label htmlFor={label}>{label}</label>}
			<input
				className="st-input"
				type="text"
				value={value}
				onChange={onChange}
				disabled={disabled}
				placeholder={placeholder}
			/>
		</div>
	);
};
