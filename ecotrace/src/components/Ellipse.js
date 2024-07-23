import React from 'react';

const Ellipse = () => {
    return (
        <svg width="287" height="287" viewBox="0 0 287 287" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_175_257)">
                <circle cx="143.5" cy="143.5" r="109.5" fill="#7B7B7B" />
            </g>
            <defs>
                <filter id="filter0_f_175_257" x="0.900002" y="0.900002" width="285.2" height="285.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="16.55" result="effect1_foregroundBlur_175_257" />
                </filter>
            </defs>
        </svg>
    );
};

export default Ellipse;
