import React, { useState, useRef, useEffect } from 'react';
import ApiService from "../../service/ApiService";
import './articleForm.css';
import Navbar from "../common/Navbar";
import FooterComponent from "../common/Footer";

function ArticleWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textareaRef = useRef(null);

    // Auto-resize textarea
    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        autoResizeTextarea();
    }, [content]);

    // Validate the form input for minimum length
    const validateForm = () => {
        if (!title || title.length < 5) {
            setError("Title must be at least 5 characters long.");
            return false;
        }
        if (!content || content.length < 20) {
            setError("Content must be at least 20 characters long.");
            return false;
        }
        return true;
    };

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) return;

        const author = ApiService.getUsernameFromToken();
        if (!author) {
            setError("Unable to determine the current user.");
            return;
        }

        setIsSubmitting(true);
        try {
            const article = { title, content, author };
            await ApiService.createArticle(article);
            setTitle("");
            setContent("");
            setSuccess("Article published successfully!");

            console.log('save article: ', article);

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error publishing article.";
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="home-page">
            <Navbar/>
            <div className="article-write-container">
                <div className="article-write-wrapper">
                    <form className="article-write-form" onSubmit={handleSubmit}>
                        <input
                            className="article-title-input"
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                        />

                        <textarea
                            ref={textareaRef}
                            className="article-content-textarea"
                            placeholder="Tell your story..."
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                autoResizeTextarea();
                            }}
                        />

                        <div className="article-write-footer">
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">{success}</p>}

                            <button
                                className="publish-button"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Publishing..." : "Publish"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterComponent />
        </div>
            );
            }

            export default ArticleWrite;