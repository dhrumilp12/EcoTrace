import React, { useState } from 'react';
import axios from 'axios';

const CreatePostForm = ({ threadId }) => {
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token'); // Ensure you're getting the auth token correctly
            const response = await axios.post(`/forum/threads/${threadId}/posts`, { content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Post created successfully!');
            setContent(''); // Clear the textarea after posting
        } catch (error) {
            setMessage('Error posting message: ' + (error.response?.data.message || error.message));
        }
        setIsSubmitting(false);
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit}>
                <textarea
                    style={styles.textarea}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write your post here..."
                    required
                />
                <button style={styles.button} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Post'}
                </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        margin: '20px',
        background: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    message: {
        color: '#28a745',
        marginTop: '10px',
    }
};

export default CreatePostForm;
