import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryBTN = ({ name, to }) => {
    return (
        <div className="flex items-center justify-center">
            <Link
                to={to}
                className="flex justify-center items-center gap-2.5 py-2.5 px-8 rounded-lg shadow-inner transform transition-transform duration-300 ease-in-out hover:scale-105"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(24,34,6,0.36) 63%, rgba(24,34,6,0.43) 94%),linear-gradient(0deg, #B2E62B 0%, #B2E62B 100%)',
                    boxShadow: 'inset 4px 4px 4px 0 rgba(234, 234, 234, 0.5), inset 0px 0px 4px 0 rgba(0, 0, 0, 0.5)',
                }}>
                <span className="text-[#071108] work_sans leading-[1.28] tracking-[-0.32px]">
                    {name}
                </span>
            </Link>
        </div>
    );
};

export default PrimaryBTN;