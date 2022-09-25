import React from 'react';
import logo from '../images/header-logo.svg';
import { Route, Link } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ loggedIn, logout }) {
	const currentUser = React.useContext(CurrentUserContext);
	function handleClickLogout(e) {
		e.preventDefault();
		logout();
	}
	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="логтип Место-Россия" />
			<div className="header__auth">
				{loggedIn && <p className="header__auth-email">{currentUser.email}</p>}
				<Route path="/sign-in">
					<Link className="header__auth-button" to="/sign-up">Регистрация</Link>
				</Route>
				<Route path="/sign-up">
					<Link className="header__auth-button" to="/sign-in">Войти</Link>
				</Route>
				<Route exact path="/">
					<Link
						className="header__auth-button header__auth-button_type_authorized"
						to="/sign-in"
						onClick={handleClickLogout}
					>
						Выйти
					</Link>
				</Route>
			</div>
		</header>
	)
}

export default Header;