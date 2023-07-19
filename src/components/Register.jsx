import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {

  return (
    <AuthForm
      formName="Регистрация"
      btnName="Зарегистрироваться"
      onSubmit={onRegister}
    >
      <div className="authorization__link-container">
        <p className="authorization__link">Уже зарегистрированы? <Link to="/sign-in" className="header__link">Войти</Link></p>
      </div>
    </AuthForm>
  )
}

export default Register;