import React from 'react'
import Sidebar from './Sidebar'
import '/Users/jason_sutanto/tagpt2/tagpt2/frontend/src/styles/dashboard.css'
import Content from './Content';
import Profile from './Profile'
import { useNavigation } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dashboard--content'>
            <Content/>
            <Profile/>
        </div>
    </div>
  )
}

export default Dashboard