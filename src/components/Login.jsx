import React from 'react';
import AuthForm from './AuthForm';

const Login = ({ onLogin }) => (
  <AuthForm
    formName="Вход"
    btnName="Войти"
    onSubmit={onLogin}
  />
);

export default Login;