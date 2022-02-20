import React, { useState, KeyboardEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select, { OnChangeValue } from 'react-select';
import { Input } from '../formparts/textinput/textinput';
import { ExerciseType, ITestExerciseAll } from '../../../data/exercise-types';
import { Button } from '../formparts/button/button';

interface ITestWizardDataButton {
	setTestData: (data: ITestExerciseAll) => void;
}

interface Option {
	readonly label: string;
	readonly value: string;
}

const createOption = (label: string): Option => ({
	label,
	value: label,
});

export const TestWizardDataButton = ({ setTestData }: ITestWizardDataButton): JSX.Element => {
	const [question, setQuestion] = useState<string>('');
	const [variantsInputValue, setVariantsInputValue] = useState<string>('');
	const [variantsValue, setVariantsValue] = useState<readonly Option[]>([]);
	const [answerValue, setAnswerValue] = useState<Option>();
	const [errorMessage, setErrorMessage] = useState<string>();

	const handleVariantsChange = (val: OnChangeValue<Option, true>): void => {
		errorMessage && setErrorMessage(undefined);
		setVariantsValue(val);
	};

	const handleVariantsInputChange = (input: string): void => {
		errorMessage && setErrorMessage(undefined);
		setVariantsInputValue(input);
	};

	const handlePreviewClick = (): void => {
		if (!question || !variantsValue.length || !answerValue) {
			console.log('gg');
			setErrorMessage('Заполните все поля');
			return;
		}
		console.log('yay');
		setTestData({
			type: ExerciseType.button,
			title: 'Выберите правильный ответ',
			question: question,
			answer: answerValue.value,
			variants: variantsValue.map((el) => el.value),
		});
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

	const questionBlock = (): JSX.Element => (
		<div className="testwizard__data_block-row">
			<div className="testwizard__data_block-row-label">Вопрос</div>
			<Input
				className="testwizard__data_block-row-control"
				value={question}
				placeholder="Вопрос"
				onChange={(e): void => {
					errorMessage && setErrorMessage(undefined);
					setQuestion(e.target.value);
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
				onChange={handleVariantsChange}
				onInputChange={handleVariantsInputChange}
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
				value={answerValue}
				onChange={(val): void => {
					if (!val) return;
					errorMessage && setErrorMessage(undefined);
					setAnswerValue(val);
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

	const actionBlock = (): JSX.Element => (
		<div className="testwizard__data_block-row testwizard__data_block-row--end">
			{errorMessage ? (
				<div className="testwizard__data_block-row__error">{errorMessage}</div>
			) : (
				<></>
			)}
			<Button text="Превью" onClick={handlePreviewClick} />
			<Button
				text="Сохранить задание в тесте"
				onClick={(e) => {
					console.log(`click`, e);
				}}
			/>
		</div>
	);

	return (
		<div className="testwizard__data_block">
			{questionBlock()}
			{variantsBlock()}
			{answerBlock()}
			{actionBlock()}
		</div>
	);
};
