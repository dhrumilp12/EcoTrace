import React from 'react';
import { Link } from 'react-router-dom';

const SecondaryBTN = ({ name, to }) => {
    return (
        <div className="flex items-center justify-center">
            <Link
                to={to}
                className="flex justify-center items-center gap-2.5 py-2.5 px-8 rounded-lg shadow-inner transform transition-transform duration-300 ease-in-out hover:scale-105"
                style={{
                    background:
                        'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%),linear-gradient(0deg, #060D07 0%, #060D07 100%)',
                    boxShadow: 'inset 4px 4px 13.3px 0 rgba(255, 255, 255, 0.25)',
                }}>
                <span className="text-[#F6FCE9] work_sans">
                    {name}
                </span>
            </Link>
        </div>
    );
};

export default SecondaryBTN;