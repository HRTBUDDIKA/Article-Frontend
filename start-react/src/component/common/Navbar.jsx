import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import './navbar.css'; // We'll create a new CSS file for styling

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <NavLink to="/home">START</NavLink>
                </div>
                <ul className="navbar-menu">
                    <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to="/artical" className={({ isActive }) => isActive ? 'active' : ''}>Article</NavLink></li>
                    <li><NavLink to="/write" className={({ isActive }) => isActive ? 'active' : ''}>Write</NavLink></li>

                    {isUser && <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink></li>}
                    {isAdmin && <li><NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink></li>}

                    {!isAuthenticated && (
                        <>
                            <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink></li>
                            <li><NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink></li>
                        </>
                    )}
                    {isAuthenticated && (
                        <li className="logout-btn" onClick={handleLogout}>Logout</li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;