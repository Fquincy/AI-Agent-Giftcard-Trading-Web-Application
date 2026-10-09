'use client';
import './signup.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [selectedCountry, setSelectedCountry] = useState<'nigeria' | 'ghana' | null>(null);
  const router = useRouter();

  const handleProceed = () => {
    if (selectedCountry) {
      // Store selected country and navigate to registration form
      sessionStorage.setItem('selectedCountry', selectedCountry);
      router.push('/get-started/signup/register');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="signup-gradient-orb orb-1"></div>
        <div className="signup-gradient-orb orb-2"></div>
        <div className="signup-grid-pattern"></div>
      </div>

      <div className="signup-content">
        <Link href="/get-started" className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </Link>

        <Link href="/" className="signup-logo-link">
          <Image
            src="/logo (1).png"
            alt="Leyou Logo"
            width={180}
            height={42}
            className="signup-logo"
            priority
          />
        </Link>

        <div className="signup-card">
          <p className="signup-welcome">Welcome to Leyou Exchange</p>
          <h1 className="signup-title">Where are you from?</h1>

          <div className="country-selection">
            <button
              className={`country-card ${selectedCountry === 'nigeria' ? 'selected' : ''}`}
              onClick={() => setSelectedCountry('nigeria')}
              type="button"
              aria-label="Select Nigeria"
              aria-pressed={selectedCountry === 'nigeria'}
            >
              <div className="country-flag">
                <Image
                  src="/flags/nigeria.svg"
                  alt="Nigeria Flag"
                  width={80}
                  height={53}
                />
              </div>
              <div className="country-info">
                <span className="country-label">I'm a Nigerian</span>
              </div>
              {selectedCountry === 'nigeria' && (
                <div className="selected-indicator">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}
            </button>

            <button
              className={`country-card ${selectedCountry === 'ghana' ? 'selected' : ''}`}
              onClick={() => setSelectedCountry('ghana')}
              type="button"
              aria-label="Select Ghana"
              aria-pressed={selectedCountry === 'ghana'}
            >
              <div className="country-flag">
                <Image
                  src="/flags/ghana.svg"
                  alt="Ghana Flag"
                  width={80}
                  height={53}
                />
              </div>
              <div className="country-info">
                <span className="country-label">I'm a Ghanian</span>
              </div>
              {selectedCountry === 'ghana' && (
                <div className="selected-indicator">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}
            </button>
          </div>

          <button
            className={`btn-continue ${selectedCountry ? 'enabled' : 'disabled'}`}
            disabled={!selectedCountry}
            onClick={handleProceed}
            type="button"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

