'use client';
import './register.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { countryCodes, isCountry, passwordError } from '../../../lib/registration';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    retypePassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>('+234');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Get selected country from sessionStorage
    const country = sessionStorage.getItem('selectedCountry');
    if (isCountry(country)) {
      setSelectedCountry(country);
      setCountryCode(countryCodes[country]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    const passwordMessage = passwordError(formData.password);
    if (passwordMessage) newErrors.password = passwordMessage;
    if (!isCountry(selectedCountry)) newErrors.country = 'Please choose your country before registering';

    if (!formData.retypePassword) {
      newErrors.retypePassword = 'Please retype your password';
    } else if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitMessage('');
    if (!validateForm()) {
      setSubmitMessage('Please correct the highlighted fields before creating your account.');
      return;
    }
    setIsSubmitting(true);

    try {
      // Password confirmation is local only; it is not part of the API payload.
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: countryCode + formData.phone.replace(/^0+/, ''),
          address: formData.address.trim(),
          password: formData.password,
          country: selectedCountry,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors && typeof result.errors === 'object') setErrors(result.errors);
        setSubmitMessage(typeof result.error === 'string' ? result.error : 'Registration failed. Please try again.');
        return;
      }
      setSubmitMessage('Account created. You can now log in.');
      setFormData(previous => ({ ...previous, password: '', retypePassword: '' }));
      router.replace('/login?registered=1');
    } catch {
      setSubmitMessage('Unable to confirm registration. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-gradient-orb orb-1"></div>
        <div className="register-gradient-orb orb-2"></div>
        <div className="register-grid-pattern"></div>
      </div>

      <div className="register-content">
        <Link href="/get-started/signup" className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </Link>

        <Link href="/" className="register-logo-link">
          <Image
            src="/logo (1).png"
            alt="Leyou Logo"
            width={180}
            height={42}
            className="register-logo"
            priority
          />
        </Link>

        <div className="register-card">
          <p className="register-welcome">Welcome to Leyou Exchange</p>
          <h1 className="register-title">Create Your Account</h1>
          <p className="register-subtitle">Fill in your details to get started</p>

          <p className="register-subtitle">This is a learning application. Please use sample details only.</p>
          {errors.country && <p role="alert"><Link href="/get-started/signup">{errors.country}</Link></p>}
          <form onSubmit={handleSubmit} className="register-form" aria-label="Registration form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <div className="phone-input-wrapper">
                <div className="country-code-display">
                  {countryCode}
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input phone-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  autoComplete="tel"
                />
              </div>
              {errors.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className={`form-input ${errors.address ? 'error' : ''}`}
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
                autoComplete="street-address"
              />
              {errors.address && (
                <span id="address-error" className="error-message" role="alert">
                  {errors.address}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password (8+ chars, uppercase, lowercase, number, special char)"
                value={formData.password}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : 'password-requirements'}
                autoComplete="new-password"
              />
              <div id="password-requirements" className="password-requirements">
                Password must contain: 8+ characters, uppercase, lowercase, number, and special character
              </div>
              {errors.password && (
                <span id="password-error" className="error-message" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="retypePassword" className="form-label">Retype Password</label>
              <input
                type="password"
                id="retypePassword"
                name="retypePassword"
                className={`form-input ${errors.retypePassword ? 'error' : ''}`}
                placeholder="Retype your password"
                value={formData.retypePassword}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.retypePassword}
                aria-describedby={errors.retypePassword ? 'retype-password-error' : undefined}
                autoComplete="new-password"
              />
              {errors.retypePassword && (
                <span id="retype-password-error" className="error-message" role="alert">
                  {errors.retypePassword}
                </span>
              )}
            </div>

            {submitMessage && <p role="alert" aria-live="polite">{submitMessage}</p>}
            {errors.country && <p role="alert"><Link href="/get-started/signup">Choose your country to continue</Link></p>}
            <button type="submit" disabled={isSubmitting} className="btn-register-submit" aria-label="Submit registration form">
              {isSubmitting ? 'Submitting...' : 'Create Account'}
            </button>

            <div className="login-link">
              <span className="login-text">Already have an account?</span>
              <Link href="/login" className="btn-login-link">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

