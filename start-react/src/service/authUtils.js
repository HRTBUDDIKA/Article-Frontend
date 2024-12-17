// authUtils.js
import { jwtDecode } from 'jwt-decode';

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-unused-expressions
    token && token.startsWith('Bearer ') ? token.slice(7) : token;
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.username; // Adjust based on your token's payload structure
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

