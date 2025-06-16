import './Login.css';
import loginShopping from '../assets/login-shopping.svg';

function Login() {
  return (
    <div className="login-container">
      <div className="login-image">
        <div className='login-logo'>
            <h1>Vendora</h1>
        </div>
        <div className="login-quote">
            <h2>Browse. Buy. Brag.</h2>
        </div>
        <img src={loginShopping} alt="Shopping Online" />
      </div>
      <div className="login-content">
        <div className="flex-3"></div>
      <div className="login-form">
        <h1 className="login-title">Ready to shop?</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <div className='pass-section'>
                <label htmlFor="password">Password</label>
                <a href="/forgot-password" className="forgot-password-link">Forgot?</a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
            <p className="register-link">
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </form>
      </div>
      <div className="flex-2"></div>
        <div className="login-footer">
            <p>Are you seller? <a href="/seller/login">Login here</a> {" "} © 2023 Vendora. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
