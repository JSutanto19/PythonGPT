import React from 'react'
import pyLogo from '../assets/coding.png'

function MyFigure({showCircle}) {
  return (
    <div className='pr-44 flex items-end'>
      <figure className=''>
        <img src={pyLogo} alt='logo' className='z-5 mt-[-12px]'/>
      </figure>
       <div className='bg-[#38b6ff] w-96 h-96 lg:w-[900px] lg:h-[950px] rounded-full absolute -right-10 -bottom-72 -z-20'>
      </div>
    </div>
  )
}

export default MyFigure