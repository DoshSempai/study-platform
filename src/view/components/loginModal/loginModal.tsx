import React, { useState } from 'react';
import cn from 'classnames';
import { ActionModal } from '../modal/modal';
import './loginModal.css';
import { Input } from '../formparts/textinput/textinput';

interface ILoginModal {
	onClose: () => void;
}

enum EnterMode {
	Login,
	Register,
}

export const LoginModal = ({ onClose }: ILoginModal): JSX.Element => {
	const [enterMode, setEnterMode] = useState<EnterMode>(EnterMode.Login);
	const [userEmail, setUserEmail] = useState<string>('');
	const [userPass, setUserPass] = useState<string>('');
	const [inputError, setInputError] = useState<boolean>(false);
	const [networkError, setNetworkError] = useState<string>();

	const onSubmit = (): void => {
		if (!userEmail || !userPass) {
			setInputError(true);
			return;
		}
		const data =
			enterMode === EnterMode.Login
				? {
						email: userEmail,
						password: userPass,
				  }
				: {
						email: userEmail,
						password: userPass,
						name: 'noop',
				  };

		setNetworkError('Ошибка авторизации');
		console.log(`onSubmit`, data);
	};

	const Tabs = (): JSX.Element => (
		<div className="tabs-wrap">
			<div
				className={cn('st-tab', {
					'st-tab--active': enterMode === EnterMode.Login,
				})}
				onClick={(): void => setEnterMode(EnterMode.Login)}
			>
				Логин
			</div>
			<div
				className={cn('st-tab', {
					'st-tab--active': enterMode === EnterMode.Register,
				})}
				onClick={(): void => setEnterMode(EnterMode.Register)}
			>
				Регистрация
			</div>
		</div>
	);

	return (
		<ActionModal
			title={enterMode === EnterMode.Login ? 'Логин' : 'Регистрация'}
			actionName={enterMode === EnterMode.Login ? 'Войти' : 'Зарегистрироваться'}
			onClose={onClose}
			onAction={onSubmit}
			content={
				<div style={{ minWidth: '40vw' }}>
					<Tabs />

					<div className="login-body">
						{networkError && <div className="modal__error_message">{networkError}</div>}

						<div className="input-wrap">
							<Input
								error={inputError && !userEmail}
								placeholder="Email"
								value={userEmail}
								onChange={(e): void => {
									inputError && setInputError(false);
									networkError && setNetworkError(undefined);
									setUserEmail(e.target.value);
								}}
							/>
						</div>
						<div className="input-wrap">
							<Input
								error={inputError && !userPass}
								placeholder="Пароль"
								value={userPass}
								type="password"
								onChange={(e): void => {
									inputError && setInputError(false);
									networkError && setNetworkError(undefined);
									setUserPass(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>
			}
		/>
	);
};
