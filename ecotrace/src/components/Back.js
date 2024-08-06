import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Back() {
    const navigate = useNavigate();  // Get the navigate function from the hook

    // Function to handle the back action
    const goBack = () => {
        navigate(-1);  // Move back one step in the history stack
    };
    return (
        <div onClick={goBack} style={{ cursor: 'pointer' }}>
                <svg
                    width="36"
                    height="33"
                    viewBox="0 0 36 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="33" rx="10" fill="#E1E0EC" />
                    <path d="M22 8.5L14 16.5L22 24.5" stroke="#071108" stroke-width="2" />
                </svg>
            
        </div>
    );
}
