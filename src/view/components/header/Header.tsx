import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AvatarIcon, LoginIcon } from '../../../assets/svg';
import { AuthContext } from '../../../context/authContext';
import { Input } from '../formparts/textinput/textinput';
import { LoginModal } from '../loginModal/loginModal';
import './Header.css';

interface IHeader {
	canLogin: boolean;
	searchValue?: string;
	setSearchValue?: (data: string) => void;
}

export const Header = ({ searchValue, setSearchValue }: IHeader): JSX.Element => {
	const { authData } = useContext(AuthContext);
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

	console.log(`authData`, authData);
	return (
		<>
			<div className="header">
				<Link to="/" className="stplatform-link">
					<div className="header__title">TestMe</div>
				</Link>
				<div className="header__part--right">
					{searchValue !== undefined && setSearchValue && (
						<div className="header__search">
							<Input
								placeholder="Поиск теста..."
								value={searchValue}
								onChange={(e): void => {
									setSearchValue(e.target.value);
								}}
							/>
						</div>
					)}
					{authData.authenticated ? (
						<div className="header__avatar">
							<AvatarIcon />
						</div>
					) : (
						<div
							className="header__avatar header__avatar--onhover"
							onClick={(): void => setShowLoginModal(true)}
						>
							<LoginIcon />
						</div>
					)}
				</div>
			</div>
			{showLoginModal && <LoginModal onClose={(): void => setShowLoginModal(false)} />}
		</>
	);
};
