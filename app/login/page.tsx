'use client';
import './login.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-gradient-orb orb-1"></div>
        <div className="login-gradient-orb orb-2"></div>
        <div className="login-grid-pattern"></div>
      </div>

      <div className="login-content">
        <Link href="/" className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back to Home</span>
        </Link>

        <Link href="/" className="login-logo-link">
          <Image
            src="/logo (1).png"
            alt="Leyou Logo"
            width={180}
            height={42}
            className="login-logo"
            priority
          />
        </Link>

        <div className="login-card">
          <h1 className="login-title">Let's get you back in</h1>

          <form onSubmit={handleLogin} className="login-form" aria-label="Login form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email / Username</label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                autoComplete="current-password"
              />
            </div>

            <div className="form-actions">
              <div className="forgot-password">
                <span className="forgot-text">Forget password?</span>
                <button type="button" className="btn-reset">Reset password</button>
              </div>
            </div>

            <button type="submit" className="btn-login-submit" aria-label="Submit login form">
              Process login
            </button>

            <div className="signup-link">
              <span className="signup-text">Don't have an account?</span>
              <Link href="/get-started" className="btn-signup-link">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

