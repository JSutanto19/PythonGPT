import React from 'react'
import {BiSearch, BiNotification} from 'react-icons/bi'
import '../styles/content.css'

const ContentHeader = () => {
  return (
    <div className='content--header'>
        <div className='header--title' style={{color: '#526d82', fontWeight:'bold', fontSize:'25px'}}>
            Dashboard
        </div>
        <div className='header--activity'>
            <div className='search--box'>
                <input type='text' placeholder='Search anything here...'/>
                <BiSearch className='icon'/>
            </div>
            <div className='notify'>
                <BiNotification className='icon'/>
            </div>
        </div>
    </div>
  )
}

export default ContentHeader