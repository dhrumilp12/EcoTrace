import React, { useState } from 'react';
import axios from 'axios';

const CreateThreadForm = ({ categoryId }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await axios.post(`/forum/${categoryId}/threads`, { title }, {
                headers: {
                    Authorization: `Bearer ${token}` // Ensure the Authorization header is set
                }
            });
            setMessage('Thread created successfully!');
            setTitle(''); // Clear the title after submission
        } catch (error) {
            setMessage('Failed to create thread: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h2>Create New Thread</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Thread Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Create Thread</button>
                {message && <p style={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        margin: 'auto',
        maxWidth: '600px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    message: {
        marginTop: '10px',
        color: '#4CAF50',
    }
};

export default CreateThreadForm;
