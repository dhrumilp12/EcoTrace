import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
const styles = {
    container: {
        background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%),linear-gradient(0deg, #060D07 0%, #060D07 100%)',
        color: '#F7F7F7',
        fontFamily: 'Source Serif 4, serif',
        padding: '20px',
        borderRadius: '20px',
        margin: '20px',
    },
    title: {
        backgroundColor: '#071108',
        padding: '20px',
        borderRadius: '20px',
        textAlign: 'center',
        fontSize: '24px',
        color: '#F7F7F7',
        marginBottom: '10px',
        margin: '20px',
    },
    formField: {
        marginBottom: '20px'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',  // Adds space between the SVG icon and the label text
        fontSize: '16px',
        marginBottom: '10px'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: 'rgba(94,110,72,0.5)',
        color: '#A6DE14'
    },
    button: {
        padding: '10px 20px',
        color: '#F7F7F7',
        backgroundColor: '#071108',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer'
    },
    buttonHover: { // Not directly usable, handled via React state if needed
        backgroundColor: '#333'
    },
    select: {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: 'rgba(94,110,72,0.5)',
        color: '#A6DE14'
    },
    message: {
        position: 'fixed', // Fixed at the bottom
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '15px 30px',
        backgroundColor: '#A6DE14',
        color: '#FFF',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1500,
        fontSize: '1rem',
        textAlign: 'center',
        maxWidth: '90%',
        border: '1px solid #D4D4D8',
    },
    errorMessage: {
        background: 'rgba(204, 0, 0, 0.85)', // For error messages
        border: '1px solid darkred'
    }
};



const CreateEventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [publicStatus, setPublicStatus] = useState(false);
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // First, geocode the address to get latitude and longitude
            const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
            if (geocodeResponse.data.status !== 'OK' || !geocodeResponse.data.results[0]) {
                throw new Error('Failed to geocode address');
            }
            const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('date', dateTime);
            formData.append('public', publicStatus);
            formData.append('location', JSON.stringify({ coordinates: [lng, lat] }));

            images.forEach(image => {
                formData.append('images', image);
            });

            const response = await axios.post('/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Event created:', response.data);
            setMessage('Event created successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error creating event:', error);
            setMessage('Failed to create event: ' + error.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleImageChange = (event) => {
        setImages([...event.target.files]);
    };

    return (
        <div >
            <Header />
            <div style={styles.title}>
                
                <span>Create New Event</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={styles.container}>
                <div style={styles.formField}>
                

                    <label style={styles.label}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 4V20H7V12H17V20H19V4H17V10H7V4H5Z" fill="#A6DE14"/>
                </svg>
                Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.formField}>
                

                    <label style={styles.label}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 6V18H7V6H21M21 6V4H7V6H5V18H7V20H21V18H23V6H21M3 20V4H5V20H3Z" fill="#A6DE14"/>
                </svg>
                Description:</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.formField}>
                
                    <label style={styles.label}>
                    <svg
                    width="27"
                    height="31"
                    viewBox="0 0 27 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.0385164 0V7.70328H27V0H0.0385164ZM0.0385164 11.5549V30.4665C0.0385164 30.6591 0.192582 30.8131 0.385164 30.8131H26.6148C26.8074 30.8131 26.9615 30.6591 26.9615 30.4665V11.5549H0H0.0385164ZM3.89016 15.4066H7.7418V19.2582H3.89016V15.4066ZM11.5934 15.4066H15.4451V19.2582H11.5934V15.4066ZM19.2967 15.4066H23.1484V19.2582H19.2967V15.4066ZM3.89016 23.1098H7.7418V26.9615H3.89016V23.1098ZM11.5934 23.1098H15.4451V26.9615H11.5934V23.1098Z"
                        fill="#A6DE14" />
                    </svg>
                    Date and Time:</label>
                    <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.formField}>
                

                    <label style={styles.label}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM13 14H11V12H13V14ZM13 10H11V8H13V10Z" fill="#A6DE14"/>
                </svg>
                Public:</label>
                    <select value={publicStatus} onChange={e => setPublicStatus(e.target.value)} style={styles.select}>
                        <option value="false">Private</option>
                        <option value="true">Public</option>
                    </select>
                </div>
                <div style={styles.formField}>
                
                    <label style={styles.label}>
                    <svg
                width="27"
                height="28"
                viewBox="0 0 27 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 0.846687V27.8054H26.9587V19.7852C27.0138 19.5411 27.0138 19.2879 26.9587 19.0438V0.812988H0V0.846687ZM3.36984 4.21653H23.5889V17.6959H18.5341C18.4332 17.6868 18.3317 17.6868 18.2308 17.6959C17.784 17.7361 17.3714 17.9522 17.0838 18.2966C16.7963 18.641 16.6573 19.0856 16.6976 19.5324C16.7378 19.9793 16.9539 20.3919 17.2983 20.6795C17.6427 20.967 18.0873 21.1059 18.5341 21.0657H23.5889V24.4356H3.36984V4.21653ZM11.7944 7.58637C8.99747 7.58637 6.73968 9.84416 6.73968 12.6411C6.73968 16.011 11.7944 21.0657 11.7944 21.0657C11.7944 21.0657 16.8492 16.011 16.8492 12.6411C16.8492 9.84416 14.5914 7.58637 11.7944 7.58637ZM11.7944 10.9562C12.738 10.9562 13.4794 11.6976 13.4794 12.6411C13.4794 13.5847 12.738 14.326 11.7944 14.326C10.8509 14.326 10.1095 13.5847 10.1095 12.6411C10.1095 11.6976 10.8509 10.9562 11.7944 10.9562Z"
                    fill="#A6DE14" />
                </svg>
                Enter Location:</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.formField}>
                    <label style={styles.label}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 17L14.5 12L19 18H5L8.5 13.5Z" fill="#A6DE14"/>
                    </svg>

                    Images:</label>
                    
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} style={styles.input} />
                </div>
                </div>
                <button
                type="submit"
                style={{
                    width: 'calc(100% - 40px)',
                    height: '45px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2.5px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.72) 100%), linear-gradient(0deg, #E1E0EC 0%, #E1E0EC 100%)',
                    color: '#071108',
                    fontFamily: 'Work Sans, sans-serif',
                    fontWeight: '600',
                    lineHeight: 1.28,
                    letterSpacing: '-0.32px',
                    margin: '0 20px 20px 20px',
                }}
            >
                Post
            </button>
            {message && (
                    <p style={message.startsWith('Failed') ? {...styles.message, ...styles.errorMessage} : styles.message}>
                        {message}
                    </p>
                )}
            </form>
            
        </div>
    );
};

export default CreateEventForm;