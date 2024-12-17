import React, { useState, useEffect } from 'react';
import ApiService from "../../service/ApiService";
import './artical.css';
import Navbar from "../common/Navbar";
import FooterComponent from "../common/Footer";

function UserArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserArticles();
    }, []);

    const fetchUserArticles = async () => {
        try {
            // Assuming you'll need to modify your backend to support this
            const username = ApiService.getUsernameFromToken();

            // You might need to add a new endpoint in your Spring Boot backend
            // like `/api/articles/by-author/{username}`
            const response = await ApiService.getArticlesByAuthor(username);
            setArticles(response);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching articles:", err);
            setError("Unable to fetch articles. Please try again.");
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
        return readTimeMinutes;
    };

    const handleEditArticle = (articleId) => {
        // Implement edit functionality
        console.log("Edit article:", articleId);
    };

    const handleDeleteArticle = async (articleId) => {
        try {
            await ApiService.deleteArticle(articleId);
            // Remove the deleted article from the list
            setArticles(articles.filter(article => article.id !== articleId));
        } catch (err) {
            console.error("Error deleting article:", err);
            setError("Unable to delete article. Please try again.");
        }
    };

    if (isLoading) {
        return <div className="articles-loading">Loading your articles...</div>;
    }

    if (error) {
        return <div className="articles-error">{error}</div>;
    }

    return (
        <div className="home-page">
            <Navbar/>
            <div className="user-articles-container">
                <h1>Your Stories</h1>
                {articles.length === 0 ? (
                    <div className="no-articles">
                        <p>You haven't written any articles yet.</p>
                        <button onClick={() => {/* Navigate to write article */
                        }}>
                            Write your first story
                        </button>
                    </div>
                ) : (
                    <div className="articles-list">
                        {articles.map((article) => (
                            <div key={article.id} className="article-preview">
                                <div className="article-content">
                                    <h2>{article.title}</h2>
                                    <p className="article-excerpt">
                                        {article.content.length > 200
                                            ? article.content.substring(0, 200) + '...'
                                            : article.content}
                                    </p>
                                    <div className="article-meta">
                                        <span>{formatDate(article.createdAt)}</span>
                                        <span className="dot-separator">·</span>
                                        <span>{calculateReadTime(article.content)} min read</span>
                                    </div>
                                    <div className="article-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEditArticle(article.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteArticle(article.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <FooterComponent />
        </div>
            );
            }

            export default UserArticles;