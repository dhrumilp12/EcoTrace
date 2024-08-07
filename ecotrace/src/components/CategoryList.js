import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateThreadForm from './CreateThreadForm';
import ThreadList from './ThreadList';
import api from '../api';

const styles = {
    container: {
        padding: '20px',
        margin: '20px auto',
        maxWidth: '800px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontFamily: 'Work Sans, sans-serif',
    },
    title: {
        background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%), linear-gradient(0deg, #060D07 0%, #060D07 100%)',
        color: '#F7F7F7',
        padding: '20px',
        borderRadius: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '24px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    },
    listItem: {
        background: 'linear-gradient(180deg, rgba(199,217,196,0.25) 0%, rgba(160,162,155,0.25) 100%), linear-gradient(0deg, #F7F7F7 0%, #F7F7F7 100%)',
        padding: '20px',
        borderRadius: '20px',
        margin: '10px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
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
    },
    error: {
        color: 'red',
        padding: '10px 20px',
        borderRadius: '10px',
        background: '#FFEDEC',
        border: '1px solid #FFC2C2',
        textAlign: 'center',
    }
};

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [activeTabs, setActiveTabs] = useState({});

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/forum/categories');
            const initialTabs = response.data.reduce((acc, category) => {
                acc[category._id] = 'view'; // Default tab
                return acc;
            }, {});
            setCategories(response.data);
            setActiveTabs(initialTabs);
        } catch (error) {
            setError('Error fetching categories: ' + (error.response?.data.message || error.message));
        }
    };

    const toggleTab = (categoryId, tab) => {
        setActiveTabs({
            ...activeTabs,
            [categoryId]: tab
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Forum Categories</h2>
            {error && <p style={styles.error}>{error}</p>}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {categories.map((category) => (
                    <li key={category._id} style={styles.listItem}>
                        <h3 style={{ fontSize: '19px', fontWeight: '600', color: '#071108' }}>{category.title}</h3>
                        <p style={{ color: '#071108', fontSize: '14px', marginTop: '5px' }}>{category.description}</p>
                        <div>
                            <button style={activeTabs[category._id] === 'view' ? {...styles.tab, ...styles.activeTab} : styles.tab}
                                onClick={() => toggleTab(category._id, 'view')}>
                                View Threads
                            </button>
                            <button style={activeTabs[category._id] === 'create' ? {...styles.tab, ...styles.activeTab} : styles.tab}
                                onClick={() => toggleTab(category._id, 'create')}>
                                Create Thread
                            </button>
                        </div>
                        {activeTabs[category._id] === 'view' && <ThreadList categoryId={category._id} />}
                        {activeTabs[category._id] === 'create' && <CreateThreadForm categoryId={category._id} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
