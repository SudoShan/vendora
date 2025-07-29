import './SignUp.css';
import SignIn from '../assets/signin.svg';
import axiosInstance from '../utils/api';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [step, setStep] = useState('input');
  const [fullName, setFullName] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [contact, setContact] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const validateContact = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSendOtp = () => {
    if (!validateContact(contact)) {
      setError('Enter a valid email');
      return;
    }

    const sendOtp = async () => {
      try {
        const response = await axiosInstance.post('/auth/send-otp', { email: contact });
        if (response.data.success) {
          setStep('otp');
          setError('');
        } else {
          setError('Failed to send OTP. Please try again later.');
        }
      } catch (err) {
        if(err.response.status === 400) {
            setError('Email already registered');
        } else {
            setError('Failed to send OTP. Please try again later.');
        }
      }
    };
    sendOtp();

  };

  const handleVerifyOtp = () => {
    const verifyOtp = async () => {
      try {
        const response = await axiosInstance.post('/auth/verify-otp', { email: contact, otp: enteredOtp });
        if (response.data.verified) {
          setStep('password');
          setError('');
        } else {
          setError('Invalid or expired OTP');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to verify OTP. Please try again later.');
      }
    };
    verifyOtp();
  };

  const handleCreateAccount = () => {
    if (!password) {
      setError('Password is required');
      return;
    }

    const createAccount = async () => {
      try {
        const response = await axiosInstance.post('/auth/register', {
          email: contact,
          password,
          fullName,
          role: isSeller ? 'seller' : 'user',
        });
        if (response.data.success) {
          navigate('/login');
        } else {
          setError(response.data.message || 'Failed to create account');
        }
      } catch {
        setError('Failed to create account. Please try again later.');
      }
    };
    createAccount();
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <div className="signup-logo">
          <h1>Vendora</h1>
        </div>
        <div className="signup-quote">
          <h2>Limitless. Seamless. Yours.</h2>
        </div>
        <div className="signup-image-content">
          <img src={SignIn} alt="Shopping Online" />
        </div>
      </div>

      <div className="signup-form-section">
        <div className="signup-form">
          <h1 className="signup-title">Create Account</h1>

          {step === 'input' && (
            <>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <label style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
                <input
                  type="checkbox"
                  checked={isSeller}
                  onChange={(e) => setIsSeller(e.target.checked)}
                  style={{ marginRight: 6 }}
                />
                I am a seller
              </label>
              <label>Enter Email</label>
              <input
                type="text"
                placeholder="example@mail.com"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              {error && <p className="error-text">{error}</p>}
              <button onClick={handleSendOtp} className="signup-button">Send OTP</button>
            </>
          )}

          {step === 'otp' && (
            <>
              <label>Enter OTP sent to {contact}</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              {error && <p className="error-text">{error}</p>}
              <button onClick={handleVerifyOtp} className="signup-button">Verify OTP</button>
            </>
          )}

          {step === 'password' && (
            <>
              <label>Create Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error-text">{error}</p>}
              <button onClick={handleCreateAccount} className="signup-button">Create Account</button>
            </>
          )}

          <p className="register-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
