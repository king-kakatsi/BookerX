import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR, WHITE } from '../theme/colors';

/**
 * HeroSection component for BookerX landing page.
 * Props:
 *   - imageUrl: string (image to display)
 *   - title: string
 *   - subtitle: string
 *   - buttonText: string
 *   - onButtonClick: function
 */
const HeroSection = ({
  imageUrl = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  title = 'Welcome to BookerX',
  subtitle = 'Your modern book management platform. Organize, discover, and share your favorite books easily.',
  buttonText = 'Browse Books',
  onButtonClick = () => {},
}) => {
  return (
    <section style={{ background: BACKGROUND_COLOR, width: '100%', padding: '3rem 0' }}>
      <style>{`
        @media (max-width: 600px) {
          .hero-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
      <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-center gap-5">
        <div className="mb-4 mb-lg-0 flex-shrink-0" style={{ maxWidth: 380, width: '100%' }}>
          <img
            src={imageUrl}
            alt="BookerX Hero"
            style={{ width: '100%', height: 'auto', borderRadius: 24, boxShadow: '0 4px 24px rgba(80,0,120,0.08)' }}
          />
        </div>
        <div className="text-center text-lg-start" style={{ maxWidth: 520 }}>
          <h1 className="hero-title" style={{ color: PRIMARY_COLOR, fontWeight: 800, fontSize: '2.5rem', marginBottom: 16 }}>{title}</h1>
          <p style={{ color: SECONDARY_COLOR, fontSize: '1.25rem', marginBottom: 32 }}>{subtitle}</p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
            <button
              style={{
                background: PRIMARY_COLOR,
                color: WHITE,
                border: 'none',
                borderRadius: 24,
                padding: '0.75rem 2.5rem',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px rgba(80,0,120,0.07)',
                cursor: 'pointer',
              }}
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
            <button
              style={{
                background: WHITE,
                color: PRIMARY_COLOR,
                border: `2px solid ${PRIMARY_COLOR}`,
                borderRadius: 24,
                padding: '0.75rem 2.5rem',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px rgba(80,0,120,0.07)',
                cursor: 'pointer',
              }}
              onClick={() => window.location.href = '/register'}
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 