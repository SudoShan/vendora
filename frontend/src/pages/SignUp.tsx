import './SignUp.css';
import SignIn from '../assets/signin.svg';
import { useState } from 'react';

function SignUp() {
  const [step, setStep] = useState<'input' | 'otp' | 'password'>('input');
  const [fullName, setFullName] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [contact, setContact] = useState('');
  //const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateContact = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSendOtp = () => {
    if (!validateContact(contact)) {
      setError('Enter a valid email or 10-digit phone number');
      return;
    }

    // Check for existing account (not implemented)
    const accountExists = false;
    if (accountExists) {
      setError('Account already exists with this contact.');
      return;
    }

    // Simulate sending OTP
    const generatedOtp = '123456'; // Placeholder
    setOtp(generatedOtp);
    //setOtpSent(true);
    setStep('otp');
    setError('');
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === otp) {
      setStep('password');
      setError('');
    } else {
      setError('Invalid OTP. Try again.');
    }
  };

  const handleCreateAccount = () => {
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    console.log('Account created with:', { contact, password });
    setError('');
    alert('Account created successfully! (simulate)');
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
              <label>Enter Email or Phone</label>
              <input
                type="text"
                placeholder="example@mail.com or 9876543210"
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
