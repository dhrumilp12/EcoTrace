import React, { useState } from 'react';
import { CreateCategoryForm, CategoryList, ThreadList, CreateThreadForm } from '../components';
import Header from '../components/Header';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%),linear-gradient(0deg, #060D07 0%, #060D07 100%)',
        padding: '20px',
        paddingBottom: '60px',
    },
    button: {
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
    buttonActive: {
        backgroundColor: '#A6DE14',
        color:'#071108'
    }
};

const Forum = () => {
    const [activeTab, setActiveTab] = useState('list'); // 'list' for CategoryList, 'create' for CreateCategoryForm
    
    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container px-4 py-8 mx-auto pb-20">
        <Header />
        <div style={styles.container}>
            
            <div>
                <button
                    onClick={() => toggleTab('create')}
                    style={activeTab === 'create' ? { ...styles.button, ...styles.buttonActive } : styles.button}
                >
                    Create New Category
                </button>
                <button
                    onClick={() => toggleTab('list')}
                    style={activeTab === 'list' ? { ...styles.button, ...styles.buttonActive } : styles.button}
                >
                    Show Category List
                </button>
            </div>
            {activeTab === 'create' && <CreateCategoryForm />}
            {activeTab === 'list' && <CategoryList />}
        </div>
        </div>
    );
};

export default Forum;
