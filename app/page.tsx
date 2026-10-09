'use client';
import './page.css';
import './hero.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="hero-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <Image
              src="/logo (1).png"
              alt="Leyou Logo"
              width={180}
              height={42}
              className="logo-image"
              priority
            />
          </div>

          <ul 
            id="mobile-navigation"
            className={`nav-links ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}
            role="navigation"
            aria-label="Main navigation"
          >
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#faqs" onClick={() => setMobileMenuOpen(false)}>FAQs</a></li>
            <li><a href="#blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</a></li>
            <li><a href="#rates" onClick={() => setMobileMenuOpen(false)}>Rates</a></li>
            <li><a href="#reward" onClick={() => setMobileMenuOpen(false)}>Reward</a></li>
            <li className="mobile-nav-buttons">
              <Link href="/login" className="btn-login">Login</Link>
              <Link href="/get-started" className="btn-primary">Get started</Link>
            </li>
          </ul>

          <div className="nav-buttons desktop-only">
            <Link href="/login" className="btn-login">Login</Link>
            <Link href="/get-started" className="btn-primary">Get started</Link>
          </div>

          <button
            className="hamburger-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>

          {/* Country Flags */}
          <div className="country-flags">
            <div className="flag-item flag-1">
              <Image src="/flags/nigeria.svg" alt="Nigeria" width={60} height={40} />
            </div>
            <div className="flag-item flag-2">
              <Image src="/flags/ghana.svg" alt="Ghana" width={60} height={40} />
            </div>
          </div>
        </div>

        <div className="hero-wrapper">
          <div className="hero-content">
            <div className="badge" role="status" aria-label="Trusted by over 100,000 users">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0l2.5 5.5L16 6.5l-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1z"/>
              </svg>
              <span>Trusted by 100,000+ Users</span>
            </div>

            <h1 className="hero-title">
              The Evolution<br />
              of <span className="gradient-text">Gift Card</span><br />
              Trading
            </h1>

            <p className="hero-subtitle">
              Experience lightning-fast transactions with the most competitive rates.
              Turn your gift cards into cash or crypto in seconds with our secure platform.
            </p>

            <div className="cta-buttons">
              <button className="cta-btn cta-ios" aria-label="Download app on iOS">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="btn-text">
                  <span className="btn-label">Get on</span>
                  <span className="btn-platform">iOS</span>
                </div>
              </button>

              <button className="cta-btn cta-android" aria-label="Download app on Android">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.523 15.341c-.759 0-1.373.615-1.373 1.373s.614 1.373 1.373 1.373c.758 0 1.372-.615 1.372-1.373s-.614-1.373-1.372-1.373zm-11.046 0c-.758 0-1.372.615-1.372 1.373s.614 1.373 1.372 1.373c.759 0 1.373-.615 1.373-1.373s-.614-1.373-1.373-1.373zm5.523-13.341l1.24-2.322c.063-.118.02-.263-.098-.326-.117-.064-.262-.021-.325.097l-1.257 2.351c-1.043-.472-2.201-.733-3.421-.733-1.22 0-2.378.261-3.42.733l-1.257-2.351c-.063-.118-.208-.161-.325-.097-.118.063-.161.208-.098.326l1.24 2.322c-2.456 1.255-4.139 3.723-4.139 6.589h16c0-2.866-1.683-5.334-4.14-6.589zm-5.66 4.076c-.273 0-.495-.221-.495-.495 0-.273.222-.495.495-.495s.495.222.495.495c0 .274-.222.495-.495.495zm7.32 0c-.273 0-.495-.221-.495-.495 0-.273.222-.495.495-.495s.495.222.495.495c0 .274-.222.495-.495.495zm-12.66 3.924v7h2v4c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5v-4h3v4c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5v-4h2v-7h-13z"/>
                </svg>
                <div className="btn-text">
                  <span className="btn-label">Get on</span>
                  <span className="btn-platform">Android</span>
                </div>
              </button>

              <button className="cta-btn cta-web" aria-label="Trade on web platform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span>Trade on Web</span>
              </button>

              <button className="cta-btn cta-whatsapp" aria-label="Trade on WhatsApp">
                <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span>Trade on WhatsApp</span>
              </button>
            </div>

            <div className="hero-features">
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-value">$50M+</div>
                  <div className="stat-label">Trading Volume</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">99.9%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>

              <div className="trust-badges">
                <div className="trust-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  <span>Secure & Safe</span>
                </div>
                <div className="trust-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                  </svg>
                  <span>Instant Processing</span>
                </div>
                <div className="trust-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Best Rates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
          <div className="card-stack">
            <div className="gift-card card-1">
              <Image
                src="/amazon-giftcard.svg"
                alt="Amazon Gift Card"
                fill
                className="card-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-shimmer"></div>
            </div>
            <div className="gift-card card-2">
              <Image
                src="/itunes-giftcard.svg"
                alt="iTunes Gift Card"
                fill
                className="card-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-shimmer"></div>
            </div>
            <div className="gift-card card-3">
              <Image
                src="/steam-giftcard.svg"
                alt="Steam Gift Card"
                fill
                className="card-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-shimmer"></div>
            </div>
          </div>
          <div className="crypto-indicator">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm7.189 17.297l-1.297 5.297c-.094.406-.547.594-.953.406l-2.703-1.125-1.297 1.406c-.187.187-.453.281-.719.281-.141 0-.281-.031-.406-.094-.297-.125-.5-.406-.5-.719v-2.422l5.063-5.063c.219-.219.219-.578 0-.797-.219-.219-.578-.219-.797 0l-6.297 6.297-2.609-1.125c-.406-.172-.594-.625-.422-1.047l1.297-5.297c.094-.406.547-.594.953-.406l2.703 1.125 1.297-1.406c.375-.375.984-.375 1.344 0 .187.188.281.438.281.703v2.422l-5.063 5.063c-.219.219-.219.578 0 .797.109.109.266.172.406.172s.297-.063.406-.172l6.297-6.297 2.609 1.125c.391.156.578.625.406 1.031z"/>
            </svg>
            <div className="crypto-pulse"></div>
          </div>
        </div>
        </div>
      </section>

      {/* Brand Ticker Section */}
      <section className="brand-ticker-section">
        <div className="ticker-wrapper">
          <div className="ticker-track">
            <div className="ticker-item">
              <Image src="/brands/nike-card.svg" alt="Nike" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/walmart-card.svg" alt="Walmart" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/google-card.svg" alt="Google Play" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/steam-card.svg" alt="Steam" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/amazon-card.svg" alt="Amazon" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/vanilla-card.svg" alt="Vanilla" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/ebay-card.svg" alt="eBay Gold" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/visa-card.svg" alt="VISA" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/nike-card.svg" alt="Nike" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/walmart-card.svg" alt="Walmart" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/google-card.svg" alt="Google Play" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/steam-card.svg" alt="Steam" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/amazon-card.svg" alt="Amazon" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/vanilla-card.svg" alt="Vanilla" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/ebay-card.svg" alt="eBay Gold" width={120} height={75} />
            </div>
            <div className="ticker-item">
              <Image src="/brands/visa-card.svg" alt="VISA" width={120} height={75} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Customer Loves Us Section */}
      <section className="why-love-us-section">
        <div className="section-container">
          <h2 className="section-title">Why Our Customer Loves Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3 className="feature-title">Fast Payments</h3>
              <p className="feature-description">Get your money instantly with our lightning-fast payment processing system. No waiting, no delays.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="feature-title">Secure Transactions</h3>
              <p className="feature-description">Your data and transactions are protected with bank-level encryption and security measures.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="feature-title">Best Exchange Rate</h3>
              <p className="feature-description">We offer the most competitive rates in the market. Get maximum value for your gift cards.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="feature-title">24/7 Customer Support</h3>
              <p className="feature-description">Our dedicated support team is available round the clock to assist you with any queries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Customers Section */}
      <section className="trusted-customers-section">
        <div className="section-container">
          <h2 className="section-title">Trusted by over 100,000+ Customers</h2>
          <p className="section-subtitle">Join thousands of satisfied customers who trust us with their gift card trading needs.<br />Experience seamless transactions and exceptional service every time.</p>
          <div className="testimonials-ticker">
            <div className="testimonials-track">
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;Fast and reliable service! Got my payment within minutes.&quot;</p>
                  <span className="testimonial-name">- Sarah Johnson</span>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;Best rates I&apos;ve found anywhere. Highly recommended!&quot;</p>
                  <span className="testimonial-name">- Michael Chen</span>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;Customer support is amazing. They helped me every step of the way.&quot;</p>
                  <span className="testimonial-name">- Emily Rodriguez</span>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;Secure platform and instant payments. What more could you ask for?&quot;</p>
                  <span className="testimonial-name">- David Thompson</span>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;I&apos;ve been using this service for months. Never had any issues!&quot;</p>
                  <span className="testimonial-name">- Lisa Anderson</span>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;Fast and reliable service! Got my payment within minutes.&quot;</p>
                  <span className="testimonial-name">- Sarah Johnson</span>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;Best rates I&apos;ve found anywhere. Highly recommended!&quot;</p>
                  <span className="testimonial-name">- Michael Chen</span>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-bubble">
                  <p className="testimonial-text">&quot;Customer support is amazing. They helped me every step of the way.&quot;</p>
                  <span className="testimonial-name">- Emily Rodriguez</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download and Start Trading Section */}
      <section className="download-section">
        <div className="section-container">
          <h2 className="download-title">Download and Start Trading</h2>
          <p className="download-subtitle">Get the app now and trade your gift card instantly with you!</p>
          <div className="download-buttons">
            <button className="download-btn ios-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Get on iOS</span>
            </button>
            <button className="download-btn android-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341c-.759 0-1.373.615-1.373 1.373s.614 1.373 1.373 1.373c.758 0 1.372-.615 1.372-1.373s-.614-1.373-1.372-1.373zm-11.046 0c-.758 0-1.372.615-1.372 1.373s.614 1.373 1.372 1.373c.759 0 1.373-.615 1.373-1.373s-.614-1.373-1.373-1.373zm5.523-13.341l1.24-2.322c.063-.118.02-.263-.098-.326-.117-.064-.262-.021-.325.097l-1.257 2.351c-1.043-.472-2.201-.733-3.421-.733-1.22 0-2.378.261-3.42.733l-1.257-2.351c-.063-.118-.208-.161-.325-.097-.118.063-.161.208-.098.326l1.24 2.322c-2.456 1.255-4.139 3.723-4.139 6.589h16c0-2.866-1.683-5.334-4.14-6.589zm-5.66 4.076c-.273 0-.495-.221-.495-.495 0-.273.222-.495.495-.495s.495.222.495.495c0 .274-.222.495-.495.495zm7.32 0c-.273 0-.495-.221-.495-.495 0-.273.222-.495.495-.495s.495.222.495.495c0 .274-.222.495-.495.495zm-12.66 3.924v7h2v4c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5v-4h3v4c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5v-4h2v-7h-13z"/>
              </svg>
              <span>Get on Android</span>
            </button>
          </div>
        </div>
      </section>

      {/* Leyou In The NEWS Section */}
      <section className="news-section">
        <div className="section-container">
          <h2 className="section-title">Leyou In The NEWS</h2>
          <p className="news-subtitle">Click any media logo to read what they said about us</p>
          <div className="news-ticker">
            <div className="news-track">
              <div className="news-item">
                <div className="news-logo">TechCrunch</div>
              </div>
              <div className="news-item">
                <div className="news-logo">Forbes</div>
              </div>
              <div className="news-item">
                <div className="news-logo">Bloomberg</div>
              </div>
              <div className="news-item">
                <div className="news-logo">The Verge</div>
              </div>
              <div className="news-item">
                <div className="news-logo">Wired</div>
              </div>
              <div className="news-item">
                <div className="news-logo">BBC</div>
              </div>
              <div className="news-item">
                <div className="news-logo">CNN</div>
              </div>
              <div className="news-item">
                <div className="news-logo">Reuters</div>
              </div>
              <div className="news-item">
                <div className="news-logo">TechCrunch</div>
              </div>
              <div className="news-item">
                <div className="news-logo">Forbes</div>
              </div>
              <div className="news-item">
                <div className="news-logo">Bloomberg</div>
              </div>
              <div className="news-item">
                <div className="news-logo">The Verge</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact in Numbers Section */}
      <section className="impact-section">
        <div className="section-container">
          <h2 className="section-title">Our Impact in Numbers</h2>
          <p className="impact-subtitle">Trusted by satisfied customers</p>
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="impact-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="impact-value">75,002+</div>
              <div className="impact-label">transactions</div>
            </div>
            <div className="impact-stat">
              <div className="impact-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="impact-value">8 Years</div>
              <div className="impact-label">of excellence</div>
            </div>
            <div className="impact-stat">
              <div className="impact-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="impact-value">100%+</div>
              <div className="impact-label">support</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
