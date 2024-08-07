import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported for toast
import api from '../api';

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
        <div>
            <div style={styles.footerContainer}>
                <Link to="/home" style={isActive('/home') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Home</Link>
                <Link to="/forum" style={isActive('/forum') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Post</Link>
                <Link to="/create-event" style={isActive('/create-event') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Create Event</Link>
                <Link to="/event-list" style={isActive('/event-list') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Events</Link>
                <Link to="/report" style={isActive('/report') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Create Report</Link>
                <div onClick={handleLogout} style={isActive('/logout') ? { ...styles.tab, ...styles.activeTab } : styles.tab}>Logout</div>
            </div>
            <ToastContainer />
        </div>
    );
};

const styles = {
    footerContainer: {
        position: 'fixed',
        bottom: 0, // Align to the bottom
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        backgroundColor: '#071108',
        color: '#fff',
        borderTop: '2px solid #4CAF50', // Style as needed
        borderRadius: '20px',
        
    },
    tab: {
        padding: '10px 20px',
        borderRadius: '20px',
        backgroundColor: '#E1E0EC',
        border: '#071108',
        cursor: 'pointer',
        color: '#071108',
        fontWeight: 'bold'
    },
    activeTab: {
        backgroundColor: '#A6DE14',
        color: '#071108',
    }
};

export default Footer;
