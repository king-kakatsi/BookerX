import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme/colors';

const features = [
  {
    icon: '📚',
    title: 'Organize Your Library',
    desc: 'Easily manage and categorize all your books in one place.'
  },
  {
    icon: '🔍',
    title: 'Powerful Search',
    desc: 'Find any book instantly with smart search and filters.'
  },
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'Your collection is safe and only accessible by you.'
  },
  {
    icon: '🌐',
    title: 'Access Anywhere',
    desc: 'Use BookerX on any device, anytime.'
  }
];

const LandingFeatures = () => (
  <section style={{ background: '#fff', padding: '2.5rem 0' }}>
    <div className="container">
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <h2 style={{ color: PRIMARY_COLOR, fontWeight: 700, fontSize: '2rem' }}>Why Choose BookerX?</h2>
        </div>
      </div>
      <div className="row justify-content-center g-4">
        {features.map((f, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-3 d-flex align-items-stretch">
            <div className="card w-100 h-100 text-center p-4" style={{ border: 'none', boxShadow: '0 2px 12px rgba(80,0,120,0.06)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{f.icon}</div>
              <h5 style={{ color: PRIMARY_COLOR, fontWeight: 600 }}>{f.title}</h5>
              <p style={{ color: SECONDARY_COLOR, fontSize: 15 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LandingFeatures; 