import React from 'react';
import headerLogo from "../images/header-logo.svg";
import { NavLink, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
  const { pathname } = useLocation();

  const signInPath = '/sign-in';
  const signUpPath = '/sign-up';

  const isSign = pathname !== signInPath && pathname !== signUpPath;
  const isSignOut = loggedIn && isSign;

  return (
    <header className="header">
      <img className="logo header__logo" alt="Логотип проекта Mesto Russia" src={headerLogo} />
      <nav className="header__menu">
        {pathname === signInPath && (
          <NavLink to={signUpPath} className="header__link">Регистрация</NavLink>
        )}

        {pathname === signUpPath && (
          <NavLink to={signInPath} className="header__link">Войти</NavLink>
        )}

        {isSign && <span className="header__link">{email}</span>}

        {isSignOut && (
          <span className="header__link" onClick={onSignOut}>Выйти</span>
        )}
      </nav>
    </header>
  );
}

export default Header;