import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';

const Notification = () => {
    const [showModal, setShowModal] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [hasUnread, setHasUnread] = useState(false);
    const iconRef = useRef(null);
    const modalRef = useRef(null);
    const [modalStyle, setModalStyle] = useState({});

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get('/notification', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setNotifications(response.data);
                setHasUnread(response.data.some(notification => !notification.read));
            } catch (error) {
                console.error('Failed to fetch notifications', error);
                toast.error('Failed to load notifications');
            }
        };
        fetchNotifications();
    }, []);

    useEffect(() => {
        if (showModal && iconRef.current && modalRef.current) {
            const iconRect = iconRef.current.getBoundingClientRect();
            const modalHeight = modalRef.current.offsetHeight;
            const additionalOffset = 200; // Additional pixels to move the modal to the right
    
            setModalStyle({
                position: 'fixed',
                top: `${iconRect.top - modalHeight}px`,
                left: `${iconRect.left + additionalOffset}px`, // Add additionalOffset to the left property
                transform: 'translateX(-50%)',
                zIndex: 1050
            });
        }
    }, [showModal, notifications.length]);
    

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <FontAwesomeIcon
                ref={iconRef}
                icon={faBell}
                style={hasUnread ? { ...styles.icon, ...styles.activeIcon } : styles.icon}
                onClick={toggleModal}
                aria-label="Notifications"
            />

            {showModal && (
                <div style={styles.modalOverlay} onClick={toggleModal}>
                    <div ref={modalRef} style={{ ...styles.modal, ...modalStyle }} onClick={e => e.stopPropagation()}>
                        <div style={styles.modalContent}>
                            {notifications.length > 0 ? notifications.map(notification => (
                                <div key={notification._id} style={styles.notificationItem}>
                                    {notification.message}
                                </div>
                            )) : <p>No new notifications.</p>}
                            <button style={styles.closeButton} onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

const styles = {
    icon: {
        fontSize: '24px',
        padding: '10px',
        margin: '0 5px',
        borderRadius: '50%',
        backgroundColor: '#f0f0f0',
        border: '2px solid #ccc',
        cursor: 'pointer',
        color: '#333',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeIcon: {
        backgroundColor: '#ffcc00',
        color: '#fff',
        border: '2px solid #bfa000',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '50px'
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '20px',
        minWidth: '300px'
    },
    modalContent: {
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        color: '#333',
    },
    notificationItem: {
        padding: '8px 12px',
        borderBottom: '1px solid #ddd',
        marginBottom: '5px',
        borderRadius: '4px',
        color: 'black',
        backgroundColor: '#f9f9f9'
    }
};

export default Notification;
