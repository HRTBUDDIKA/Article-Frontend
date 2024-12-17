import axios from "axios"

export default class ApiService {
    static BASE_URL = "http://localhost:4040"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`, // Changed from Authentication to Authorization
            "Content-Type": "application/json"
        };
    }

    static getUsernameFromToken() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return null;
        }

        try {
            // Decode JWT token
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(window.atob(base64));

            return payload.username || payload.sub || null;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    static async getArticlesByAuthor(username) {
        try {
            const response = await axios.get(`${this.BASE_URL}/api/articles/by-author/${username}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user articles:', error);
            throw error;
        }
    }

    // AUTH METHODS
    static async registerUser(userData) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    static async loginUser(loginDetails) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
            // Assuming the backend returns a token and role
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role || 'USER');
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    // USER METHODS
    static async getAllUsers() {
        try {
            const response = await axios.get(`${this.BASE_URL}/users/all`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async getUserProfile() {
        try {
            const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    }

    static async getUser(userId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting user ${userId}:`, error);
            throw error;
        }
    }

    // AUTHENTICATION METHODS
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Optional: Redirect to login page or home page
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    // ARTICLE METHODS
    static async getArticles() {
        try {
            const response = await axios.get(`${this.BASE_URL}/api/articles`);
            return response.data;
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }

    static async createArticle(article) {
        try {
            const response = await axios.post(`${this.BASE_URL}/api/articles/write`, article, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            console.error('Error creating article:', error);
            throw error;
        }
    }

    static async updateArticle(id, article) {
        try {
            const response = await axios.put(`${this.BASE_URL}/api/articles/${id}`, article, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating article ${id}:`, error);
            throw error;
        }
    }

    static async deleteArticle(id) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/api/articles/${id}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting article ${id}:`, error);
            throw error;
        }
    }
}