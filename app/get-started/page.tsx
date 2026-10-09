'use client';
import './get-started.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const popups = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Secure and reliable",
    description: "Your transactions are protected with bank-level encryption and advanced security measures. Trade with confidence knowing your data is safe."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available round the clock to assist you with any questions or concerns. We're here whenever you need us."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Trade like a pro",
    description: "Get the best exchange rates and instant payments. Experience professional-grade trading tools designed for both beginners and experts."
  }
];

export default function GetStartedPage() {
  const [currentPopup, setCurrentPopup] = useState(0);
  const [showPopups, setShowPopups] = useState(true);

  useEffect(() => {
    if (showPopups && currentPopup < popups.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPopup(currentPopup + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPopup, showPopups]);

  const handleSkipPopups = () => {
    setShowPopups(false);
  };

  return (
    <div className="get-started-container">
      <div className="get-started-background">
        <div className="get-started-gradient-orb orb-1"></div>
        <div className="get-started-gradient-orb orb-2"></div>
        <div className="get-started-grid-pattern"></div>
      </div>

      <div className="get-started-content">
        <Link href="/" className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back to Home</span>
        </Link>

        {showPopups && (
          <Link href="/get-started/signup" className="continue-popups-btn page-top-right">
            Continue
          </Link>
        )}

        <Link href="/" className="get-started-logo-link">
          <Image
            src="/logo (1).png"
            alt="Leyou Logo"
            width={180}
            height={42}
            className="get-started-logo"
            priority
          />
        </Link>

        {showPopups ? (
          <div className="popups-container">
            {popups.map((popup, index) => (
              <div
                key={index}
                className={`popup-card ${index === currentPopup ? 'active' : index < currentPopup ? 'previous' : 'next'}`}
              >
                <div className="popup-icon">
                  {popup.icon}
                </div>
                <h2 className="popup-title">{popup.title}</h2>
                <p className="popup-description">{popup.description}</p>
                {index === currentPopup && (
                  <div className="popup-indicators">
                    {popups.map((_, i) => (
                      <div
                        key={i}
                        className={`indicator ${i === currentPopup ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="popup-footer-actions">
              <button onClick={handleSkipPopups} className="skip-popups-btn">
                Skip
              </button>
            </div>
          </div>
        ) : (
          <div className="action-buttons-container">
            <Link href="/get-started/signup" className="btn-create-account">
              Create an Account
            </Link>
            <div className="login-prompt">
              <span className="login-prompt-text">I have an account</span>
              <Link href="/login" className="btn-login-link">Login</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

