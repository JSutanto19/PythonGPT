import React, { useState } from 'react';
import Login from './Login'
import { Link } from 'react-router-dom';


function Navbar({onLoginClick, onHideLogin}) {
  return (
    <nav className='flex justify-between items-center px-44 py-3 mb-5 cursor-pointer'>
      {/* This can stay as a button if it just hides login, otherwise convert to Link if it navigates */}
      <Link to='/' onClick={onHideLogin} className='text-[#38b6ff] font-bold text-lg bg-transparent border-none cursor-pointer'>TAGPT</Link>
      <div className="space-x-5">
        {/* Convert buttons to links for navigation */}
        <Link to="/login" className='outline outline-1 outline-[#38b6ff] bg-[#38b6ff] px-4 py-2 rounded-lg hover:bg-[#38b6ff] hover:text-white transition duration-200'>
          Login
        </Link>
        <Link to="/signup" className='outline outline-1 outline-[#38b6ff] px-4 py-2 rounded-lg hover:bg-[#38b6ff] hover:text-white transition duration-200'>
          Signup
        </Link>
      </div>
    </nav>
  )
}


export default Navbar