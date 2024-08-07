import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api';

const PostList = ({ threadId }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get(`/forum/threads/${threadId}/posts`);
                setPosts(response.data);
            } catch (error) {
                setError('Error fetching posts: ' + (error.response?.data.message || error.message));
            }
        };

        fetchPosts();
    }, [threadId]);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Posts in Thread</h2>
            {error && <p style={styles.error}>{error}</p>}
            <ul style={styles.postList}>
                {posts.map((post, index) => (
                    <li key={index} style={styles.postItem}>
                        <div style={styles.postContent}>{post.content}</div>
                        <div style={styles.author}>Posted by: {post.author.username}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        margin: '20px auto',
        maxWidth: '800px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        marginBottom: '10px',
    },
    postList: {
        listStyleType: 'none',
        padding: 0,
    },
    postItem: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        marginBottom: '10px',
    },
    postContent: {
        fontSize: '16px',
        color: '#555',
    },
    author: {
        fontSize: '14px',
        color: '#888',
        marginTop: '5px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '10px',
        background: '#FFEDEC',
        border: '1px solid #FFC2C2',
    }
};

export default PostList;

