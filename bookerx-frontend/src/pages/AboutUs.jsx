import React from 'react';
import { BACKGROUND_COLOR, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_RADIUS_MEDIUM } from '../theme/colors';

// %%%%%% ABOUT US PAGE COMPONENT %%%%%%%%%%%%
/**
 * AboutUs page component. Displays information about the BookerX platform and team.
 * Example usage: <AboutUs />
 */
function AboutUs() {
    return (
        <div className="container py-5 mt-5" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: BORDER_RADIUS_MEDIUM }}>
            <h1 className="text-center mb-4" style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>About Us</h1>
            <p className="lead text-center mb-5" style={{ color: TEXT_SECONDARY }}>
                BookerX is your modern book management platform. Built with love using React and ASP.NET, our mission is to make book management simple, beautiful, and accessible for everyone.
            </p>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4 mb-4" style={{ backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(80,80,120,0.07)' }}>
                        <h3 className="mb-3" style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>Our Mission</h3>
                        <p style={{ color: TEXT_SECONDARY }}>
                            We believe that managing your books should be effortless and enjoyable. BookerX is designed to help you organize, search, and discover books with ease, whether you are a passionate reader, a student, or a professional.
                        </p>
                    </div>
                    <div className="card p-4" style={{ backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(80,80,120,0.07)' }}>
                        <h3 className="mb-3" style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>Meet the Team</h3>
                        <ul className="list-unstyled mb-0">
                            <li style={{ color: TEXT_SECONDARY, fontWeight: 'bold' }}>Leroi — Founder & Lead Developer</li>
                            <li style={{ color: TEXT_SECONDARY }}>You! — Our amazing users and contributors</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
// %%%%%% END - ABOUT US PAGE COMPONENT %%%%%%%%%%%% 