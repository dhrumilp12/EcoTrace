import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import api from '../api';


const EventList = () => {
    const [events, setEvents] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [publicOnly, setPublicOnly] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '' });

    useEffect(() => {
        fetchEvents();
    }, [publicOnly, start, end]); // Effect will re-run when filters change

    const fetchEvents = async () => {
        const token = localStorage.getItem('token');
        const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const userId = decodedToken ? decodedToken.id : null; // Replace 'userId' with the actual key where the user ID is stored in the token payload
        console.log('Decoded token:', decodedToken.id);

        const params = {
            public: publicOnly ? 'true' : undefined,
            start: start || undefined,
            end: end || undefined,
        };
        try {
            const response = await api.get('/event', { params });
            console.log('Fetched events:', response.data);
            const eventsWithAddress = await Promise.all(response.data.map(async event => ({
                ...event,
                address: await fetchAddress(event.location.coordinates),
                formattedDate: new Date(event.date).toLocaleString(), // Formatting date and time
                userHasRSVPed: event.participants.some(participant => participant._id === userId)

            })));

            setEvents(eventsWithAddress);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchAddress = async (coordinates) => {
        try {
            const { data } = await api.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
            return data.results[0]?.formatted_address || 'Address not found';
        } catch (error) {
            console.error('Error fetching address:', error);
            return 'Error fetching address';
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEvents();
    };


    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    // Function to handle RSVP
    const handleRSVP = async (eventId) => {
        try {
            // Ensure the token is correctly fetched from storage and included in headers
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to RSVP.');
                return;
            }
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
    
            const response = await api.post(`/event/${eventId}/rsvp`, {}, config);
            setNotification({
                show: true,
                message: `Successfully registered for ${response.data.event.title}!`
            });
            // Hide notification after 3 seconds
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            fetchEvents();
        } catch (error) {
            console.error('Error RSVPing to event:', error);
            alert('Failed to RSVP. Please try again.');
        }
    };
    
    
    return (
        <div className="bg-white p-4 shadow rounded-lg pb-20">
      <Header />
      {notification.show && (
                <div
                className="bg-[#A6DE14] border border-gray-200 rounded-lg shadow-lg fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3"
                style={{
                    zIndex: 1000,
                    animation: 'fadeInOut 3s forwards'
                }}
            >
                {notification.message}
            </div>
        )}
        
        
      <form onSubmit={handleSearch} className="bg-white p-4 shadow rounded-lg flex flex-col gap-4">
    

            <div className="flex flex-col items-start justify-start gap-3.5">
            <svg
                width="100%"
                height="63"
                viewBox="0 0 100% 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="63" rx="20" fill="#E1E0EC" />
                <rect
                width="100%"
                height="63"
                rx="20"
                fill="url(#paint0_linear)"
                fillOpacity="0.72" />
                <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#071108"
                fontSize="24"
                fontFamily="Arial, sans-serif">
                Find Events
                </text>
                <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="63"
                    gradientUnits="userSpaceOnUse">
                    <stop stopOpacity="0" />
                    <stop offset="1" stopColor="#BEC9A1" />
                </linearGradient>
                </defs>
            </svg>
            </div>
            <div className="flex items-center gap-2">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0C4.275 0 0 4.275 0 9.5C0 14.725 4.275 19 9.5 19C14.725 19 19 14.725 19 9.5C19 4.275 14.725 0 9.5 0ZM9.5 2.375C13.4425 2.375 16.625 5.5575 16.625 9.5C16.625 13.4425 13.4425 16.625 9.5 16.625C5.5575 16.625 2.375 13.4425 2.375 9.5C2.375 5.5575 5.5575 2.375 9.5 2.375ZM8.3125 4.75V10.0225L8.6925 10.3313L9.88 11.5188L10.6875 12.4213L12.3975 10.7113L11.495 9.90375L10.6875 9.09625V4.7975H8.3125V4.75Z" fill="black" />
                </svg>
                <label className="flex-1">
                    After this Date:
                    <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                </label>
            </div>
            <div className="flex items-center gap-2">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0C4.275 0 0 4.275 0 9.5C0 14.725 4.275 19 9.5 19C14.725 19 19 14.725 19 9.5C19 4.275 14.725 0 9.5 0ZM9.5 2.375C13.4425 2.375 16.625 5.5575 16.625 9.5C16.625 13.4425 13.4425 16.625 9.5 16.625C5.5575 16.625 2.375 13.4425 2.375 9.5C2.375 5.5575 5.5575 2.375 9.5 2.375ZM8.3125 4.75V10.0225L8.6925 10.3313L9.88 11.5188L10.6875 12.4213L12.3975 10.7113L11.495 9.90375L10.6875 9.09625V4.7975H8.3125V4.75Z" fill="black" />
                </svg>
                <label className="flex-1">
                   Before this Date:
                    <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                </label>
            </div>
            <div className="flex items-center gap-2">
                <label className="flex items-center gap-2">
                    Public Events Only:
                    <input type="checkbox" checked={publicOnly} onChange={e => setPublicOnly(e.target.checked)} />
                </label>
            </div>
        </form>
            <ul class="flex justify-start items-start flex-col gap-[17px] py-[22px] px-[15px] bg-[#E6E8E5] rounded-[20px] col-span-6 m-4">
                {events.map((event, index) => (
                    <li key={event._id} class={`flex flex-col gap-2 p-3 rounded-md ${index !== events.length - 1 ? "border-b border-gray-400" : ""}`}>
                        
                        <p
                        class="self-stretch text-[#071108] text-xl font-['Work_Sans'] font-semibold">
                        {event.title}
                        </p>
                        <div class="flex justify-start items-start flex-row gap-2">
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M9.5 0C4.275 0 0 4.275 0 9.5C0 14.725 4.275 19 9.5 19C14.725 19 19 14.725 19 9.5C19 4.275 14.725 0 9.5 0ZM9.5 2.375C13.4425 2.375 16.625 5.5575 16.625 9.5C16.625 13.4425 13.4425 16.625 9.5 16.625C5.5575 16.625 2.375 13.4425 2.375 9.5C2.375 5.5575 5.5575 2.375 9.5 2.375ZM8.3125 4.75V10.0225L8.6925 10.3313L9.88 11.5188L10.6875 12.4213L12.3975 10.7113L11.495 9.90375L10.6875 9.09625V4.7975H8.3125V4.75Z"
                            fill="black" />
                        </svg>
                        <span
                            class="text-[#7B7B7B] text-[13px] font-['Work_Sans'] leading-[1.28] tracking-[-0.26px]">
                            {event.formattedDate}
                        </span>
                        </div>
                        <div class="flex justify-start items-start flex-row gap-2">
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M0 0.0237137V18.9947H18.971V13.3508C19.0097 13.1791 19.0097 13.0008 18.971 12.8291V0H0V0.0237137ZM2.37137 2.39508H16.5996V11.8806H13.0425C12.9715 11.8741 12.9001 11.8741 12.8291 11.8806C12.5146 11.9089 12.2243 12.0609 12.022 12.3033C11.8196 12.5457 11.7218 12.8585 11.7501 13.173C11.7784 13.4874 11.9305 13.7778 12.1729 13.9801C12.4152 14.1825 12.7281 14.2802 13.0425 14.2519H16.5996V16.6233H2.37137V2.39508ZM8.29979 4.76645C6.33155 4.76645 4.74274 6.35527 4.74274 8.3235C4.74274 10.6949 8.29979 14.2519 8.29979 14.2519C8.29979 14.2519 11.8568 10.6949 11.8568 8.3235C11.8568 6.35527 10.268 4.76645 8.29979 4.76645ZM8.29979 7.13782C8.96377 7.13782 9.48548 7.65952 9.48548 8.3235C9.48548 8.98749 8.96377 9.50919 8.29979 9.50919C7.63581 9.50919 7.11411 8.98749 7.11411 8.3235C7.11411 7.65952 7.63581 7.13782 8.29979 7.13782Z"
                            fill="black" />
                        </svg>
                        <span
                            class="text-[#7B7B7B] text-[13px] font-['Work_Sans'] leading-[1.28] tracking-[-0.26px]">
                            {event.address}
                        </span>
                        </div>
                        <div class="flex justify-start items-start flex-row gap-2">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M7.5 -0.00537109C5.4375 -0.00537109 3.75 2.09463 3.75 4.68213C3.75 7.26963 5.4375 9.36963 7.5 9.36963C9.5625 9.36963 11.25 7.26963 11.25 4.68213C11.25 2.09463 9.5625 -0.00537109 7.5 -0.00537109ZM3.58125 9.36963C1.59375 9.46338 0 11.0946 0 13.1196V14.9946H15V13.1196C15 11.0946 13.425 9.46338 11.4188 9.36963C10.4062 10.5134 9.01875 11.2446 7.5 11.2446C5.98125 11.2446 4.59375 10.5134 3.58125 9.36963Z"
                            fill="black" />
                        </svg>
                        <span
                            class="text-[#7B7B7B] text-[13px] font-['Work_Sans'] leading-[1.28] tracking-[-0.26px]">
                            Organized by {event.organizer.username}
                        </span>
                        </div>
                        <div class="text-[#071108] text-[14px] font-['Work_Sans'] col-span-6">
                        {event.description}
                        </div>
                        <div style={{ width: '112px', height: '30px' }}
                        class="flex justify-center items-center flex-row gap-2.5 p-2.5 bg-[#A6DE14] rounded-[20px] col-span-2">
                        <span
                            class="text-[#000000] text-[13px] font-['Work_Sans'] tracking-[-0.26px]">
                            Public: {event.public ? 'Yes' : 'No'}
                        </span>
                        </div>        
                        {event.participants.length > 0 && (
                        <div class="flex flex-col gap-2 mt-2">
                        <div class="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 2a7 7 0 0114 0v1h-1.5c-.8 0-1.5.7-1.5 1.5V17a1.5 1.5 0 01-3 0v-.5a1.5 1.5 0 00-3 0V17a1.5 1.5 0 01-3 0v-1.5c0-.8-.7-1.5-1.5-1.5H5v-1z" fill="currentColor"/>
                            </svg>
                            <span class="text-lg font-bold">{event.participants.length} people going</span>
                        </div>
                        <div class="flex flex-col gap-1 pl-2">
                            {event.participants.map((participant, index) => (
                                <div key={index} class="flex items-center gap-3">
                                    <span class="w-3 h-3 rounded-full" style={{backgroundColor: getColor(index)}}></span>
                                    <span class="text-lg">{participant.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}



                        <div className="flex gap-4 flex-wrap">
                            {event.images.map((image, index) => (
                                <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                     onClick={() => openModal(image)}>
                                    <img src={image} alt={`Event ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                                </div>
                            ))}
                        </div>

                        {!event.userHasRSVPed && (
            <button
                className="flex justify-center items-center flex-row gap-2.5 py-2.5 px-[30px] rounded-[10px] w-full"
                style={{
                    background: 'linear-gradient(180deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.41) 100%), linear-gradient(0deg, #000000 0%, #000000 100%)'
                }}
                onClick={() => handleRSVP(event._id)}
            >
                <span className="text-[#E6E8E5] font-['Work_Sans'] tracking-[-0.32px]">
                    RSVP
                </span>
            </button>
        )}



                    </li>
                ))}
                <div class="border-solid border-[#000000] border-b col-span-6"></div>
            </ul>
            {modalOpen && <ImageModal image={selectedImage} onClose={closeModal} />}
        </div>
    );
};

const ImageModal = ({ image, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center px-4 py-8 z-50">
            <div className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full overflow-hidden">
                <img src={image} alt="Full Size" className="w-full h-auto object-contain" />
                <button onClick={onClose} className="absolute top-0 right-0 p-3 text-3xl font-bold text-white bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity duration-300">×</button>
            </div>
        </div>
    );
};

export default EventList;



function getColor(index) {
    const colors = ['#6B7280', '#10B981', '#3B82F6']; // gray, green, blue
    return colors[index % colors.length]; // cycle through colors
}

