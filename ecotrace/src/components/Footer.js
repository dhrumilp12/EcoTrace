import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported for toast
import api from '../api';
import Notification from './notification';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                const response = await api.post('/auth/logout', {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                toast.success('Logged out successfully', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true
                });
                localStorage.removeItem('token');
                setTimeout(() => navigate('/login'), 3000);
            } catch (error) {
                toast.error(`Logout failed: ${error.response?.data.message || error.message}`, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true
                });
            }
        }
    };

    return (
        <div className='mt-10'>
            
            <div style={styles.footerContainer}>
            <Notification />
                <Link to="/home" style={isActive('/home') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Home</Link>
                
                <Link to="/forum" style={isActive('/forum') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Post</Link>
                <Link to="/create-event" style={isActive('/create-event') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Create Event</Link>
                <Link to="/event-list" style={isActive('/event-list') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Events</Link>
                <Link to="/report" style={isActive('/report') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Create Report</Link>
                <Link to="/environmental-form" style={isActive('/environmental-form') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Environmental Form</Link>
                <Link to="/about" style={isActive('/about') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>About us</Link>
                <div onClick={handleLogout} style={isActive('/logout') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Logout</div>
            </div>
            <ToastContainer />
        </div>
    );
};

const styles = {
    footerContainer: {
        margin: '5px 0px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex', // Keep using flex to maintain alignment
        justifyContent: 'flex-start', // Align items to the start of the container
        overflowX: 'auto', // Enable horizontal scrolling
        whiteSpace: 'nowrap', // Prevent wrapping of items within the footer
        padding: '10px 0',
        backgroundColor: '#071108',
        color: '#fff',
        borderTop: '2px solid #4CAF50',
        borderRadius: '20px',
    },
    tab: {
        padding: '10px 20px',
        margin: '5px 5px',
        borderRadius: '20px',
        backgroundColor: '#E1E0EC',
        border: 'none',
        cursor: 'pointer',
        color: '#071108',
        fontWeight: 'bold',
        display: 'inline-block', // Change from flex item to inline-block for horizontal layout
        textAlign: 'center',
        textDecoration: 'none',
        flex: '1 0 auto',  // Grow to fill available space, but don’t shrink below content size
        minWidth: '100px',  // Minimum width for each tab
        maxWidth: '180px'   // Maximum width to prevent tabs from becoming too large
    },
    activeTab: {
        backgroundColor: '#A6DE14',
        color: '#071108',
        textDecoration: 'none'
    }
};

export default Footer;
