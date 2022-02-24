import React, { useState } from 'react';
import { ITestCommonData } from '../../../data/dashboard-data';
import { Checkbox } from '../formparts/checkbox/checkbox';
import { Input } from '../formparts/textinput/textinput';

interface ITestWizardSettingsCommon {
	settingsError?: boolean;
	removeError?: () => void;
	testSettings: ITestCommonData;
	setTestSettings: (data: ITestCommonData) => void;
}

export const TestWizardSettingsCommon = ({
	settingsError,
	removeError,
	testSettings,
	setTestSettings,
}: ITestWizardSettingsCommon): JSX.Element => {
	const [testName, setTestName] = useState<string>(testSettings.title);
	const [modeTestActive, setModeTestActive] = useState<boolean>(testSettings.testMode ?? false);
	const [modeTrainActive, setModeTrainActive] = useState<boolean>(testSettings.trainMode ?? false);
	const [hasParole, setHasParole] = useState<boolean>(testSettings.parole ? true : false);
	const [parole, setParole] = useState<string>(testSettings.parole || '');

	return (
		<div className="testwizard__setting_part">
			<div className="testwizard__setting_part-title">Общие настройки теста</div>
			<Input
				className="testwizard__setting_checkbox"
				value={testName}
				error={settingsError}
				placeholder="Название теста"
				onChange={(e): void => {
					const title = e.target.value;
					setTestName(title);
					removeError?.();
					setTestSettings({ ...testSettings, title: title });
				}}
			/>
			<Checkbox
				className="testwizard__setting_checkbox"
				checked={modeTestActive}
				label="Разрешить режим тестирования"
				onChange={(e): void => {
					const checked = e.target.checked;
					setModeTestActive(checked);
					setTestSettings({ ...testSettings, testMode: checked });
				}}
			/>
			<Checkbox
				className="testwizard__setting_checkbox"
				checked={modeTrainActive}
				label="Разрешить режим тренировки"
				onChange={(e): void => {
					const checked = e.target.checked;
					setModeTrainActive(checked);
					setTestSettings({ ...testSettings, trainMode: checked });
				}}
			/>
			<Checkbox
				className="testwizard__setting_checkbox"
				checked={hasParole}
				label="Закрыть доступ паролем"
				onChange={(e): void => {
					const isParole = e.target.checked;
					setHasParole(isParole);

					const paroleInSetting = isParole && parole ? parole : undefined;
					setTestSettings({ ...testSettings, parole: paroleInSetting });
				}}
			/>
			<Input
				value={parole}
				placeholder="Пароль"
				disabled={!hasParole}
				onChange={(e): void => {
					const paroleVal = e.target.value;
					setParole(paroleVal);
					const paroleInSetting = hasParole && paroleVal ? paroleVal : undefined;
					setTestSettings({ ...testSettings, parole: paroleInSetting });
				}}
			/>
		</div>
	);
};
