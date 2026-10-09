'use client';
import './register.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const countryCodes: Record<string, string> = {
  nigeria: '+234',
  ghana: '+233',
};

export default function RegisterPage() {
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
  const router = useRouter();

  useEffect(() => {
    // Get selected country from sessionStorage
    const country = sessionStorage.getItem('selectedCountry');
    setSelectedCountry(country);
    if (country && countryCodes[country]) {
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

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const password = formData.password;
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }

    if (!formData.retypePassword) {
      newErrors.retypePassword = 'Please retype your password';
    } else if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendWelcomeEmail = async (email: string, password: string, name: string) => {
    try {
      // Call your backend API to send welcome email
      // Replace this with your actual API endpoint
      const response = await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          country: selectedCountry,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send welcome email');
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Don't block registration if email fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const fullPhoneNumber = `${countryCode}${formData.phone}`;
      const registrationData = {
        ...formData,
        phone: fullPhoneNumber,
        country: selectedCountry,
      };

      try {
        // Here you would typically send the data to your backend API
        // Replace this with your actual API endpoint
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (response.ok) {
          // Send welcome email with password
          await sendWelcomeEmail(
            formData.email,
            formData.password,
            formData.name
          );

          alert('Registration successful! A welcome email has been sent to your email address.');
          router.push('/login');
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.message || 'Please try again'}`);
        }
      } catch (error) {
        console.error('Registration error:', error);
        // For demo purposes, still show success if API is not available
        alert('Registration successful! (Demo mode - implement your API endpoint)');
        // In production, you would still want to send the email
        // await sendWelcomeEmail(formData.email, formData.password, formData.name);
        router.push('/login');
      }
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

            <button type="submit" className="btn-register-submit" aria-label="Submit registration form">
              Create Account
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

