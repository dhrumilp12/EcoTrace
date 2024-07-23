import React from 'react'
import Back from './Back'
import Logo from './Logo'

const Header = () => {
    return (
        <div>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center'>
                    <Back />
                </div>
                <div className='flex items-center'>
                    <Logo />
                </div>
            </div>
        </div>
    )
}

export default Header