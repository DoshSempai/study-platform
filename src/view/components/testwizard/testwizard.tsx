import React from 'react';
import './testwizard.css';

interface ITestWizard {
	onCloseModal?: () => void;
}

export const TestWizard = ({ onCloseModal }: ITestWizard): JSX.Element => {
	return (
		<>
			<div className="testwizard-wrap"></div>
			<div className="testwizard">
				<div className="testwizard__header">
					<div className="testwizard__title">Создание нового теста</div>
					<div className="testwizard__close" onClick={onCloseModal}></div>
				</div>
				<div className="testwizard__content"></div>
				<div className="testwizard__footer">
					<div className="testwizard__action testwizard__action-cancel" onClick={onCloseModal}>
						Отмена
					</div>
					<div className="testwizard__action testwizard__action-create">Создать</div>
				</div>
			</div>
		</>
	);
};
