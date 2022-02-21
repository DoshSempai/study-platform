import React, { useState } from 'react';
import { Checkbox } from '../formparts/checkbox/checkbox';
import { Input } from '../formparts/textinput/textinput';

export interface ITestCommonSettingsData {
	title: string;
	testMode: boolean;
	trainMode: boolean;
	parole?: string;
}

// interface ITestWizardSettingsCommon {}

export const TestWizardSettingsCommon = (): JSX.Element => {
	const [testName, setTestName] = useState<string>('');
	const [modeTestActive, setModeTestActive] = useState<boolean>(true);
	const [modeTrainActive, setModeTrainActive] = useState<boolean>(false);
	const [hasParole, setHasParole] = useState<boolean>(false);
	const [parole, setParole] = useState<string>('');
	return (
		<div className="testwizard__setting_part">
			<div className="testwizard__setting_part-title">Общие настройки теста</div>
			<Input
				className="testwizard__setting_checkbox"
				value={testName}
				placeholder="Название теста"
				onChange={(e): void => {
					setTestName(e.target.value);
				}}
			/>
			<Checkbox
				className="testwizard__setting_checkbox"
				checked={modeTestActive}
				label="Разрешить режим тестирования"
				onChange={(e): void => {
					console.log(`test check`, e.target.checked);
					setModeTestActive(e.target.checked);
				}}
			/>
			<Checkbox
				className="testwizard__setting_checkbox"
				checked={modeTrainActive}
				label="Разрешить режим тренировки"
				onChange={(e): void => {
					console.log(`train check`, e.target.checked);
					setModeTrainActive(e.target.checked);
				}}
			/>
			<Checkbox
				className="testwizard__setting_checkbox"
				checked={hasParole}
				label="Закрыть доступ паролем"
				onChange={(e): void => {
					console.log(`check`, e);
					setHasParole(e.target.checked);
				}}
			/>
			<Input
				value={parole}
				placeholder="Пароль"
				disabled={!hasParole}
				onChange={(e): void => {
					setParole(e.target.value);
				}}
			/>
		</div>
	);
};
