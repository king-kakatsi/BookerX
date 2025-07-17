import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR } from '../theme/colors';

const LandingFooter = () => (
  <footer style={{ background: BACKGROUND_COLOR, padding: '2rem 0', borderTop: '1px solid #eee' }}>
    <div className="container text-center">
      <div style={{ fontWeight: 700, color: PRIMARY_COLOR, fontSize: 22, marginBottom: 8 }}>
        <span style={{ fontWeight: 900, fontSize: 26 }}>📚</span> BookerX
      </div>
      <div style={{ color: SECONDARY_COLOR, fontSize: 15, marginBottom: 8 }}>
        &copy; {new Date().getFullYear()} BookerX. All rights reserved.
      </div>
      <div style={{ color: SECONDARY_COLOR, fontSize: 15 }}>
        Contact: <a href="mailto:kingiscoding@gmail.com" style={{ color: PRIMARY_COLOR, textDecoration: 'underline' }}>kingiscoding@gmail.com</a>
      </div>
    </div>
  </footer>
);

export default LandingFooter; 