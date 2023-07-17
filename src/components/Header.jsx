import React from 'react';
import headerLogo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="logo header__logo" alt="Логотип проекта Mesto Russia" src={headerLogo} />
    </header>
  );
}

export default Header;