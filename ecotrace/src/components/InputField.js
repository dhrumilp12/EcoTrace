import React from 'react'

const InputField = ({ type, name, placeholder, value, onChange }) => (
    <div className='py-4'>
        <div className="flex justify-start items-center flex-row gap-2.5 py-2.5 px-[20px] bg-[#F7F7F7] border-solid border-[#7B7B7B] border rounded-[10px] col-span-5">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="flex-1 text-[#7B7B7B] work_sans bg-transparent outline-none"
                required
            />
        </div>
    </div>
)

export default InputField