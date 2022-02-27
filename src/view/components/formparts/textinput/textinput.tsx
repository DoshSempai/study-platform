import React from 'react';
import cn from 'classnames';
import './textinput.css';

interface IInput {
	type?: string;
	value: string;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	error?: boolean;
	disabled?: boolean;
	className?: string;
}

export const Input = ({
	value,
	onChange,
	label,
	disabled,
	type = 'text',
	error = false,
	className = '',
	placeholder = '',
}: IInput): JSX.Element => {
	return (
		<div className={cn('st-input-wrap', className)}>
			{label && <label htmlFor={label}>{label}</label>}
			<input
				className={cn('st-input', {
					'st-input--error': error,
				})}
				type={type}
				// type="password"
				value={value}
				onChange={onChange}
				disabled={disabled}
				placeholder={placeholder}
			/>
		</div>
	);
};
