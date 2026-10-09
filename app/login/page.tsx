'use client';
import './login.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('registered') === '1') {
      setMessage('Account created successfully. Log in with the email and password you registered.');
      window.history.replaceState(null, '', '/login');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = await response.json();
      if (!response.ok) { setMessage(result.error || 'Unable to log in. Please try again.'); return; }
      setPassword('');
      router.replace('/dashboard');
      router.refresh();
    } catch { setMessage('Check your connection and try again.'); }
    finally { setBusy(false); }
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
          <h1 className="login-title">Let&apos;s get you back in</h1>

          {message && <p role="status" aria-live="polite">{message}</p>}
          <form onSubmit={handleLogin} className="login-form" aria-label="Login form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email address"
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
                <button type="button" onClick={() => setMessage('Password reset is not available yet.')} className="btn-reset">Reset password</button>
              </div>
            </div>

            <button type="submit" disabled={busy} className="btn-login-submit" aria-label="Submit login form">
              {busy ? 'Logging in...' : 'Log in'}
            </button>

            <div className="signup-link">
              <span className="signup-text">Don&apos;t have an account?</span>
              <Link href="/get-started" className="btn-signup-link">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

