import React from 'react';
import './home.css';
import Navbar from "../common/Navbar";
import FooterComponent from "../common/Footer";

const HomePage = () => {
    return (
        <div className="home-page">
            <Navbar />
            <div className="home-content">
                <div className="hero-section">
                    <div className="hero-overlay">
                        <h1>Welcome to START</h1>
                        <p>Your Journey Begins Here</p>
                        <div className="hero-cta">
                            <button className="btn btn-primary">Get Started</button>
                            <button className="btn btn-secondary">Learn More</button>
                        </div>
                    </div>
                </div>

                <section className="features-section">
                    <div className="feature">
                        <i className="icon-write"></i>
                        <h3>Create Articles</h3>
                        <p>Share your thoughts and ideas with the world</p>
                    </div>
                    <div className="feature">
                        <i className="icon-profile"></i>
                        <h3>Personal Profile</h3>
                        <p>Manage your content and track your progress</p>
                    </div>
                    <div className="feature">
                        <i className="icon-community"></i>
                        <h3>Connect</h3>
                        <p>Join a vibrant community of writers</p>
                    </div>
                </section>
            </div>
            <FooterComponent />
        </div>
    );
};

export default HomePage;