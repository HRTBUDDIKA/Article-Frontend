import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, AtSign, Lock, Phone, EyeOff, Eye } from 'lucide-react';
import ApiService from "../../service/ApiService";
import './register.css';
import Navbar from "../common/Navbar";
import FooterComponent from "../common/Footer";

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '', // Changed from 'name'
        email: '',
        phoneNumber: '', // Changed from 'phoneNumber'
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, email, phone, password } = formData;

        // Validation checks
        if (!name) {
            setError('Please enter your name');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Phone number validation (basic example, adjust as needed)
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) {
            setError('Please enter a valid phone number');
            return false;
        }

        // Password validation
        if (password.length <= 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            // Prepare registration data
            const registrationData = {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phone,
                password: formData.password
            };

            console.log('Sending registration data:', registrationData);

            // Call registration API
            const response = await ApiService.registerUser(registrationData);

            console.log('Full response:', response);

            if (response.statusCode === 200) {
                // Successful registration
                alert('Registration Successful! Please login.');
                navigate('/login');
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-page">
            <Navbar/>
            <div className="register-container">
                <div className="register-wrapper">
                    <div className="register-header">
                        <h2>Create Your Account</h2>
                        <p>Join our community today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        {error && <div className="error-banner">{error}</div>}

                        <div className="input-group">
                            <div className="input-icon">
                                <User size={20}/>
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <AtSign size={20}/>
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <Phone size={20}/>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <Lock size={20}/>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <div
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="register-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>

                        <div className="login-prompt">
                            Already have an account?
                            <Link to="/login"> Login here</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterComponent />
        </div>
            );
            }

            export default RegisterPage;