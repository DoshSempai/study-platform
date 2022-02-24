import React, { useState } from 'react';
import Select from 'react-select';
import { ExerciseType } from '../../../data/exercise-types';

interface ITestWizardSettingsTask {
	initType?: ExerciseType;
	setType: (type: ExerciseType) => void;
}

const typeOptions = [
	{ value: ExerciseType.button, label: 'Кнопки' },
	{ value: ExerciseType.touch, label: 'Конструктор' },
];

const typeMapper = {
	[ExerciseType.button]: 'Кнопки',
	[ExerciseType.touch]: 'Конструктор',
};

export const TestWizardSettingsTask = ({
	initType,
	setType,
}: ITestWizardSettingsTask): JSX.Element => {
	const [taskType, setTaskType] = useState<{ value: ExerciseType; label: string }>();
	return (
		<div className="testwizard__setting_part">
			<div className="testwizard__setting_part-title">Настройки задания</div>
			<Select
				placeholder="Тип задания"
				isSearchable={false}
				options={typeOptions}
				defaultValue={
					initType
						? {
								value: initType,
								label: typeMapper[initType],
						  }
						: undefined
				}
				value={taskType}
				onChange={(val): void => {
					if (!val) return;
					setTaskType(val);
					setType(val.value);
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
};
