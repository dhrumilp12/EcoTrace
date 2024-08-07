import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';
import api from '../api';

const ThreadList = ({ categoryId }) => {
    const [threads, setThreads] = useState([]);
    const [error, setError] = useState('');
    const [activeThread, setActiveThread] = useState(null);
    const [tab, setTab] = useState('posts');  // Default tab
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchThreads = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/forum/${categoryId}/threads`);
                setThreads(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching threads: ' + (error.response?.data.message || error.message));
                setIsLoading(false);
            }
        };

        fetchThreads();
    }, [categoryId]);

    const handleThreadSelect = (threadId, event) => {
        event.stopPropagation(); // Stop the event from bubbling up to prevent unwanted parent handler invocation
        if (activeThread !== threadId) {
            setActiveThread(threadId);
            setTab('posts'); // Reset to posts when changing threads
        }
    };

    const handleTabChange = (newTab, event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        event.preventDefault();  // Prevent any default action that might occur
        setTab(newTab);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Threads in Category</h2>
            {isLoading ? <p style={styles.loadingMessage}>Loading threads...</p> : error ? <p style={styles.errorMessage}>{error}</p> : (
                threads.length > 0 ? (<ul style={styles.threadList}>
                    {threads.map(thread => (
                        <li key={thread._id} style={styles.threadItem} onClick={(e) => handleThreadSelect(thread._id, e)}>
                            <div style={styles.threadHeader}>
                                <h3 style={styles.threadTitle}>{thread.title}</h3>
                                <p style={styles.authorInfo}>Posted by: {thread.author.username}</p>
                            </div>
                            {activeThread === thread._id && (
                                <div style={styles.tabContainer}>
                                    <button
                                        onClick={(e) => handleTabChange('posts', e)}
                                        style={tab === 'posts' ? {...styles.tab, ...styles.activeTab} : styles.tab}
                                    >
                                        Post List
                                    </button>
                                    <button
                                        onClick={(e) => handleTabChange('create', e)}
                                        style={tab === 'create' ? {...styles.tab, ...styles.activeTab} : styles.tab}
                                    >
                                        Create Post
                                    </button>
                                    {tab === 'posts' && <PostList threadId={thread._id} />}
                                    {tab === 'create' && <CreatePostForm threadId={thread._id} />}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>) : <p>No threads found.</p>
            )}

        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        margin: 'auto',
        maxWidth: '800px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    threadList: {
        listStyle: 'none',
        padding: 0,
    },
    threadItem: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#f8f8f8',
        },
    },
    threadHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    threadTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    authorInfo: {
        fontSize: '14px',
        color: '#666',
        marginTop: '5px',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        background: '#FFEDEC',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #FFC2C2',
    },
    loadingMessage: {
        textAlign: 'center',
        fontSize: '16px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    tabContainer: {
        marginTop: '10px',
    },
    tab: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: '#060D07',
        border: '#A6DE14',
        borderStyle: 'solid',
        borderRadius: '20px',
        cursor: 'pointer',
        marginBottom: '20px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        
        transition: 'all 0.3s ease-in-out',
        margin: '10px'
    },
    activeTab: {
        backgroundColor: '#A6DE14',
        color:'#071108'
    }
};

export default ThreadList;
