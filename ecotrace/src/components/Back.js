import React from 'react';
import { Link } from 'react-router-dom';
export default function Back() {
    return (
        <div>
            <Link to="/">
                <svg
                    width="36"
                    height="33"
                    viewBox="0 0 36 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="33" rx="10" fill="#E1E0EC" />
                    <path d="M22 8.5L14 16.5L22 24.5" stroke="#071108" stroke-width="2" />
                </svg>
            </Link>
        </div>
    );
}
