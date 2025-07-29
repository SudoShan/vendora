import './Login.css';
import loginShopping from '../assets/login-shopping.svg';
import { useState, useEffect } from 'react';
import { loginUser } from '../store/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCheckAuth } from '../utils/check-auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useCheckAuth(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'seller') {
        navigate('/seller/product/new');
      } else {
        navigate('/shop/deals');
      }
    } 
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      setEmailError('Invalid email or password');
      setPasswordError('Invalid email or password');
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      if (!password) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
        dispatch(loginUser({ email, password }));
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <div className="login-logo">
          <h1>Vendora</h1>
        </div>
        <div className="login-quote">
          <h2>Browse. Buy. Brag.</h2>
        </div>
        <div className="login-image-content">
          <img src={loginShopping} alt="Shopping Online" />
        </div>
      </div>

      <div className="login-content">
        <div className="flex-3"></div>
        <div className="login-form">
          <h1 className="login-title">Ready to shop?</h1>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={`error-text ${emailError ? '' : 'hidden'}`}>{emailError || ' '}</p>
            </div>

            <div className="form-group">
              <div className="pass-section">
                <label htmlFor="password">Password</label>
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className={`error-text ${passwordError ? '' : 'hidden'}`}>{passwordError || ' '}</p>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            <p className="register-link">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </form>
        </div>

        <div className="flex-2"></div>
        <div className="login-footer">
          <p>
            Are you seller? <a href="/seller/login">Login here</a> © 2023 Vendora. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;