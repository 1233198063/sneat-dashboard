import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Facebook, Twitter, Github, Mail } from 'lucide-react';
import './Login.less';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'admin@sneat.com',
    password: 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simple authentication check
    const validCredentials = [
      { email: 'admin@sneat.com', password: 'admin' },
      { email: 'client@sneat.com', password: 'client' }
    ];

    const isValid = validCredentials.some(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    if (isValid) {
      // Store auth info if remember me is checked
      if (rememberMe) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
      }
      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setErrors({
        general: 'Invalid email or password. Please try admin@sneat.com / admin'
      });
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // You can implement social login logic here
  };

  return (
    <div className="login-page">
      {/* Left Side - Login Image */}
      <div className="login-left">
        <div className="login-image-container">
          <img 
            src="/images/log-in-image.png" 
            alt="Login Illustration" 
            className="login-image"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <div className="logo">
              <div className="logo-icon">S</div>
              <span className="logo-text">sneat</span>
            </div>
          </div>

          <div className="login-content">
            <div className="welcome-section">
              <h1 className="welcome-title">Welcome to Sneat! 👋</h1>
              <p className="welcome-subtitle">
                Please sign-in to your account and start the adventure
              </p>
            </div>

            <div className="credentials-info">
              <div className="credential-item admin">
                <span className="credential-label">Admin:</span>
                <span className="credential-value">admin@sneat.com</span>
                <span className="credential-divider">/</span>
                <span className="credential-label">Pass:</span>
                <span className="credential-value">admin</span>
              </div>
              <div className="credential-item client">
                <span className="credential-label">Client:</span>
                <span className="credential-value">client@sneat.com</span>
                <span className="credential-divider">/</span>
                <span className="credential-label">Pass:</span>
                <span className="credential-value">client</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <div className="password-icon">=</div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox"
                  />
                  <label htmlFor="rememberMe" className="checkbox-label">
                    Remember Me
                  </label>
                </div>
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              {errors.general && (
                <div className="general-error">{errors.general}</div>
              )}

              <button type="submit" className="signin-button">
                SIGN IN
              </button>
            </form>

            <div className="signup-link">
              <span>New on our platform?</span>
              <a href="#" className="create-account">Create an account</a>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button 
                className="social-button facebook"
                onClick={() => handleSocialLogin('facebook')}
              >
                <Facebook size={20} />
              </button>
              <button 
                className="social-button twitter"
                onClick={() => handleSocialLogin('twitter')}
              >
                <Twitter size={20} />
              </button>
              <button 
                className="social-button github"
                onClick={() => handleSocialLogin('github')}
              >
                <Github size={20} />
              </button>
              <button 
                className="social-button google"
                onClick={() => handleSocialLogin('google')}
              >
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;