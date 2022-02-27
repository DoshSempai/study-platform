import React, { useState, useContext } from 'react';
import cn from 'classnames';
import { ActionModal } from '../modal/modal';
import { Input } from '../formparts/textinput/textinput';
import { ILoginProps, IRegisterProps } from '../../../service/api.server.interface';
import { ApiServer } from '../../../service/api.server';
import { AuthContext } from '../../../context/authContext';
import './loginModal.css';

interface ILoginModal {
	onClose: () => void;
}

enum EnterMode {
	Login,
	Register,
}

export const LoginModal = ({ onClose }: ILoginModal): JSX.Element => {
	const { setAuthData } = useContext(AuthContext);

	const [enterMode, setEnterMode] = useState<EnterMode>(EnterMode.Login);
	const [userEmail, setUserEmail] = useState<string>('');
	const [userPass, setUserPass] = useState<string>('');
	const [inputError, setInputError] = useState<boolean>(false);
	const [networkError, setNetworkError] = useState<string>();
	const [hasLogined, setHasLogined] = useState<boolean>(false);
	const [api] = useState(new ApiServer());

	const onSubmit = (): void => {
		if (!userEmail || !userPass) {
			setInputError(true);
			return;
		}

		if (enterMode === EnterMode.Login) {
			const data: ILoginProps = {
				email: userEmail,
				password: userPass,
			};
			loginFn(data);
		} else if (enterMode === EnterMode.Register) {
			const data: IRegisterProps = {
				email: userEmail,
				password: userPass,
				name: 'noop',
			};
			registerFn(data);
		}
	};

	const loginFn = async (data: ILoginProps): Promise<void> => {
		console.log(`loginFn - data`, data);
		return api.login(data).then((res) => {
			console.log(`loginFn - res`, res);

			if (!res) {
				setNetworkError('Ошибка авторизации');
				return;
			}

			setAuthData({
				id: res.id,
				email: res.email,
				authenticated: true,
			});

			setHasLogined(true);
		});
	};

	const registerFn = async (data: IRegisterProps): Promise<void> => {
		console.log(`registerFn`, data);
		return await api.register(data).then((res) => {
			console.log(`registerFn - res`, res);

			if (!res) {
				setNetworkError('Ошибка при регистрации');
				return;
			}

			setAuthData({
				id: res.id,
				email: res.email,
				authenticated: true,
			});

			setHasLogined(true);
		});
	};

	const Tabs = (): JSX.Element => (
		<div className="tabs-wrap">
			<div
				className={cn('st-tab', {
					'st-tab--active': enterMode === EnterMode.Login,
				})}
				onClick={(): void => {
					inputError && setInputError(false);
					networkError && setNetworkError(undefined);
					setEnterMode(EnterMode.Login);
				}}
			>
				Логин
			</div>
			<div
				className={cn('st-tab', {
					'st-tab--active': enterMode === EnterMode.Register,
				})}
				onClick={(): void => {
					inputError && setInputError(false);
					networkError && setNetworkError(undefined);
					setEnterMode(EnterMode.Register);
				}}
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
			disableAction={hasLogined}
			onAction={onSubmit}
			content={
				<div style={{ minWidth: '40vw' }}>
					<Tabs />

					<div className="login-body">
						{networkError && !hasLogined && (
							<div className="modal__error_message">{networkError}</div>
						)}

						{hasLogined ? (
							<div className="login-body-haslogined">Вы вошли в систему</div>
						) : (
							<>
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
							</>
						)}
					</div>
				</div>
			}
		/>
	);
};
