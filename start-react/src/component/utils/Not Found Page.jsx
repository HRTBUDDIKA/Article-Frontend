import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
            <Link to="/home" className="back-home-link">
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;