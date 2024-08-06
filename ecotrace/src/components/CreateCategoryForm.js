import React, { useState } from 'react';
import axios from 'axios';

const styles = {
    container: {
        padding: '30px',
        margin: 'auto',
        minWidth: '600px',
        background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%),linear-gradient(0deg, #060D07 0%, #060D07 100%)',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#F7F7F7',
        fontSize: '30px',
        fontWeight: 'medium',
        marginBottom: '20px',
        padding: '10px',
        background: '#071108',
        borderRadius: '12px', // Consistent rounding with container
        maxWidth: '600px', // Ensure the title is at least 200px wide
        margin: '20px auto', // Center the title
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align the content
    },
    label: {
        fontSize: '18px',
        color: '#F7F7F7',
        font: 'sans-serif',
        fontWeight: '500',
        marginBottom: '8px', // Space between label and input
        textAlign: 'center', // Center the label text
        width: '100%', // Make label take full width of its container
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '2px solid #ccc',
        fontSize: '16px',
        width: '100%', // Make input take full width of its container
    },
    textarea: {
        padding: '12px',
        borderRadius: '8px',
        border: '2px solid #ccc',
        height: '150px',
        fontSize: '16px',
        width: '100%', // Ensure the textarea matches the input width
    },
    button: {
        padding: '12px 25px',
        marginTop: '10px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.72) 100%),linear-gradient(0deg, #E1E0EC 0%, #E1E0EC 100%)',
        color: '#071108',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        minWidth: '600px', // Ensure the button is at least 200px wide
        margin: 'auto', // Center the button
    },
    message: {
        marginTop: '20px',
        padding: '15px',
        borderRadius: '8px',
        background: '#4CAF50',
        color: 'white',
        textAlign: 'center',
        fontSize: '16px',
    }
};

// Updated React component
const CreateCategoryForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/forum/categories', { title, description }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Category created successfully!');
            setTitle('');
            setDescription('');
        } catch (error) {
            setMessage('Failed to create category: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div >
            
            <h2 style={styles.title}>Create New Forum Category</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.container}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                </div>
                <button type="submit" style={styles.button}>Create Category</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

export default CreateCategoryForm;
