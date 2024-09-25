import React from 'react'
import {BiHome, BiBookAlt, BiMessage, BiSolidReport, BiHelpCircle} from 'react-icons/bi'
import '../styles/sidebar.css'
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate = useNavigate();

  const homeClick = () => {
      navigate('/dashboard'); 
  };

  const chatClick = () => {
    navigate('/chat'); 
  };

  const discussClick = () => {
    navigate('/forum2'); 
  };

  return (
    <div className='menu'>
        <div onClick={homeClick} className='logo'>
            <BiBookAlt className='icon'/>
            <h2>TAGPT</h2>
        </div>
        <div className='menu--list'>
            <a onClick={homeClick} href='#' className='item'>
                <BiHome/>
                Dashboard
            </a>
            <a onClick={chatClick} href='#' className='item'>
                <BiMessage/>
                Chatbot
            </a>
            <a href='#' className='item' onClick={discussClick}>
                <BiSolidReport/>
                Discussion
            </a>
            {/* <a href='#' className='item'>
                <BiHelpCircle/>
                Help
            </a> */}
        </div>
    </div>
  )
}

export default Sidebar