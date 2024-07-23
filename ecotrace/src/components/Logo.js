import React from 'react';
import Img from '../assets/Logo.jpg';

export default function Logo() {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="clip-circle">
                    <circle cx="50" cy="50" r="25" />
                </clipPath>
            </defs>
            <circle cx="50" cy="50" r="25" fill="#000" stroke="#000" />
            <image href={Img} x="25" y="25" width="50" height="50" clipPath="url(#clip-circle)" />
            <path 
            d="M15.49296 29.6546L50 10.3094L84.507 29.6546V68.3452L50 87.6904L15.49296 68.3452V29.6546Z" 
            stroke="#fff" strokeWidth="4" />
        </svg>
    );
};