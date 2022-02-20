import React, { useState, KeyboardEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select, { OnChangeValue } from 'react-select';
import { Input } from '../formparts/textinput/textinput';

interface Option {
	readonly label: string;
	readonly value: string;
}

const createOption = (label: string): Option => ({
	label,
	value: label,
});

export const TestWizardDataButton = (): JSX.Element => {
	const [variantsInputValue, setVariantsInputValue] = useState<string>('');
	const [variantsValue, setVariantsValue] = useState<readonly Option[]>([]);

	const handleChange = (val: OnChangeValue<Option, true>): void => {
		setVariantsValue(val);
	};

	const handleInputChange = (input: string): void => {
		setVariantsInputValue(input);
	};

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (!variantsInputValue) return;
		switch (event.key) {
			case 'Enter':
			case 'Tab': {
				const copyInputValue = variantsInputValue;
				setVariantsValue([...variantsValue, createOption(copyInputValue)]);
				setVariantsInputValue('');
				event.preventDefault();
			}
		}
	};

	const titleBlock = (): JSX.Element => (
		<div className="testwizard__data_block-row">
			<div className="testwizard__data_block-row-label">Вопрос</div>
			<Input
				className="testwizard__data_block-row-control"
				value={''}
				placeholder="Вопрос"
				onChange={(e): void => {
					console.log(`input`, e);
				}}
			/>
		</div>
	);

	const variantsBlock = (): JSX.Element => (
		<div className="testwizard__data_block-row">
			<div className="testwizard__data_block-row-label">Варианты</div>
			<CreatableSelect
				className="testwizard__data_block-row-control"
				components={{
					DropdownIndicator: null,
				}}
				inputValue={variantsInputValue}
				isClearable
				isMulti
				menuIsOpen={false}
				onChange={handleChange}
				onInputChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder="Наберите вариант и нажмите Enter для добавления в список"
				value={variantsValue}
				styles={{
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					control: (provided, state) => ({
						...provided,
						borderColor: state.isFocused ? '#56D1BB !important' : '#cccccc',
						boxShadow: state.isFocused ? '0 0 0 1px #56D1BB' : 'none',
					}),
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					valueContainer: (provider) => ({
						...provider,
						fontFamily: 'Open Sans',
						fontSize: '13px',
						fontStyle: 'normal',
						fontWeight: 'normal',
					}),
				}}
			/>
		</div>
	);

	const answerBlock = (): JSX.Element => (
		<div className="testwizard__data_block-row">
			<div className="testwizard__data_block-row-label">Ответ</div>
			<Select
				className="testwizard__data_block-row-control"
				placeholder="Выберите ответ"
				isDisabled={!variantsValue.length}
				options={variantsValue}
				// value={}
				onChange={(val): void => {
					console.log(`val`, val);
				}}
				styles={{
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					control: (provided, state) => ({
						...provided,
						borderColor: state.isFocused ? '#56D1BB !important' : '#cccccc',
						boxShadow: state.isFocused ? '0 0 0 1px #56D1BB' : 'none',
					}),
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					valueContainer: (provider) => ({
						...provider,
						fontFamily: 'Open Sans',
						fontSize: '13px',
						fontStyle: 'normal',
						fontWeight: 'normal',
					}),
				}}
			/>
		</div>
	);

	return (
		<div className="testwizard__data_block">
			{titleBlock()}
			{variantsBlock()}
			{answerBlock()}
		</div>
	);
};
