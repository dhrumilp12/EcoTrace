import React from 'react';
import { Link } from 'react-router-dom';


const TertiaryBTN = ({ name, to }) => {
    return (
        <Link to={to} className="flex justify-center items-center flex-row gap-2.5 py-2.5 px-[30px] bg-[#071108] rounded-[10px] col-span-5">
            <span className="text-[#E4E3EE] font-work_sans">
                {name}
            </span>
        </Link>
    );
}

export default TertiaryBTN;