import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { startLogin } from '../actions/auth';
import logo from '../assets/images/logo.png';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(startLogin(email, password)).then(() => {
        navigate('/');
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onFormSubmit}>
        <div className="login-card">
          <div className="login-card__logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="login-card__title">Sign In</h2>

          <input
            className="login-card__input"
            name="email"
            value={email}
            type="text"
            placeholder="Email"
            onChange={onChange}
          />
          <br />
          <input
            className="login-card__input"
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={onChange}
          />
          <br />

          {error && <p className="login-card__error">{error}</p>}

          <button className="btn btn-primary login-card__button" type="submit">
            Sign In
          </button>

          <NavLink to="/" className="login-card__back">
            <FontAwesomeIcon className="goback-icon" icon="arrow-circle-left" /> Go back to dashboard
          </NavLink>
        </div>
      </form>
    </div>
  );
};
