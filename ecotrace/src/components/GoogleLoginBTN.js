import React from 'react';

const GoogleLoginBTN = () => {
    // Use environment variable to form the correct backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    return (
        <div className="flex items-center justify-center">
            <a
                href={`${backendUrl}/auth/auth/google`} // Now points to the correct backend server
                className="flex justify-center items-center gap-2.5 py-2.5 px-8 rounded-lg shadow-inner transform transition-transform duration-300 ease-in-out hover:scale-105"
                style={{
                    background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%),linear-gradient(0deg, #060D07 0%, #E1E0EC 100%',  // A solid green color that might match other buttons
                    color: '#FFFFFF',
                    boxShadow: 'inset 4px 4px 13.3px 0 rgba(255, 255, 255, 0.25)',
                    textDecoration: 'none' // Removing underline from link
                }}>
                <div className="flex items-center justify-center gap-2.5">
                    {/* SVG logo inline for direct control over the display */}
                    
                    <svg version="1.1" viewBox="0 0 48 48" style={{ width: '24px', height: '24px', marginRight: '8px' }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                    <span className="text-[#060D07] font-bold" style={{ fontSize: '16px' }}>
                        Sign in with Google
                    </span>
                </div>
            </a>
        </div>
    );
};

export default GoogleLoginBTN;