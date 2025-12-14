import React from 'react';
import logo from '../../assets/SS.jpg'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
        <div className='flex items-end'>
            <img className='w-max-full h-12' src={logo} alt="" />
            <h3 className='text-3xl font-bold ms-2.5'>ScholarStream</h3>
        </div>
        </Link>
    );
};

export default Logo;