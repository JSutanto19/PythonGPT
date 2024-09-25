import React from 'react';
import ProfileHeader from './ProfileHeader';
import '../styles/profile.css';
import img1 from '../assets/pic1.jpeg';
import { BiBook, BiLogOut, BiSolidCloudUpload } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='profile'>
      <ProfileHeader/>
      
      <div className="user--profile">
        <div className="user--detail">
          <img src={img1} alt='profile pic'/>
          <h3 className='username'>John Doe</h3>
          <span className='profession'>Instructor</span>
        </div>
        <div className='user-courses'>
          {/* Questions Card */}
          <div className='course'>
            <div className='course--detail'>
              <div className='course--cover'>                 
                <BiBook />
              </div>
              <div className='course-name'>
                <h5 className='title'>Questions</h5>
                <span className='duration'>3 questions</span>
              </div>
            </div>
            <div className='action'>:</div>
          </div>

          {/* Uploads Card */}
          <div className='course'>
            <div className='course--detail'>
              <div className='course--cover'>
                <BiSolidCloudUpload />
              </div>
              <div className='course-name'>
                <h5 className='title'>Uploads</h5>
                <span className='duration'>4 files</span>
              </div>
            </div>
            <div className='action'>:</div>
          </div>

          {/* Logout Card */}
          <div className='course'>
            <div className='course--detail'>
              <div className='course--cover'>
                <BiLogOut />
              </div>
              <div className='course-name' onClick={handleLogout}>
                <h5 className='title'>Logout</h5>
                <span className='duration'></span>
              </div>
            </div>
            <div className='action'>:</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
