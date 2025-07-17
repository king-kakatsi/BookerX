import React from 'react';
import HeroSection from '../components/HeroSection';
import LandingFeatures from '../components/LandingFeatures';
import LandingPopularBooks from '../components/LandingPopularBooks';
import LandingFooter from '../components/LandingFooter';

function AboutUs() {
    return (
        <>
            <HeroSection
                imageUrl="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                title="Unlock your reading potential with BookerX"
                subtitle="Organize, discover, and share your favorite books easily. Join a community of passionate readers."
                buttonText="Browse Books"
                onButtonClick={() => window.location.href = '/'}
            />
            <LandingFeatures />
            <LandingPopularBooks />
            <LandingFooter />
        </>
    );
}

export default AboutUs;
