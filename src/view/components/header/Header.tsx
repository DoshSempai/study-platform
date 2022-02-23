import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../formparts/textinput/textinput';
import './Header.css';

interface IHeader {
	searchValue?: string;
	setSearchValue?: (data: string) => void;
}

export const Header = ({ searchValue, setSearchValue }: IHeader): JSX.Element => (
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
			<div className="header__settings">crimson15dream</div>
		</div>
	</div>
);
