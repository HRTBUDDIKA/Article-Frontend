import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AtSign, Lock, Eye, EyeOff } from 'lucide-react';
import ApiService from "../../service/ApiService";
import './LoginPage.css';
import Navbar from "../common/Navbar";
import FooterComponent from "../common/Footer";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Comprehensive validation
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await ApiService.loginUser({email, password});

            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);

                // Success notification could be added here
                navigate(from, { replace: true });
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-page">
            <Navbar/>
            <div className="login-container">
                <div className="login-wrapper">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Login to continue your journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-banner">{error}</div>}

                        <div className="input-group">
                            <div className="input-icon">
                                <AtSign size={20}/>
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <Lock size={20}/>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </div>
                        </div>

                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging In...' : 'Login'}
                        </button>

                        <div className="register-prompt">
                            Don't have an account?
                            <Link to="/register"> Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterComponent />
        </div>
            );
            }

            export default LoginPage;