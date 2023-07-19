import React, { useState } from 'react';

/**
 * @property {string} formName
 * @property {string} btnName
 * @property {function} onSubmit
 * @returns 
 */
function AuthForm({ formName, btnName, onSubmit, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(setter) {
    return ({ target: { value } }) => {
      setter(value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password)
  }

  return (
    <section className={"authorization"}>
      <div className="authorization__container">
        <h2 className="authorization__title">{formName}</h2>
        <form className="authorization__form" name='authorizarion' noValidate onSubmit={handleSubmit}>
            <div className="authorization__input-container">
              <input
                id="email-input"
                className="authorization__input"
                type="email"
                placeholder="Email"
                name="email"
                minLength="2"
                maxLength="40"
                value={email}
                onChange={handleChange(setEmail)}
                noValidate
                required />
              <input
                id="password-input"
                className="authorization__input"
                type="password"
                placeholder="Пароль"
                name="password"
                minLength="2"
                maxLength="200"
                value={password}
                onChange={handleChange(setPassword)}
                noValidate
                required />
            </div>
            <button className="authorization__submit-btn" type="submit">{btnName}</button>
        </form>
        {children}
      </div>
    </section>
  );
};

export default AuthForm;