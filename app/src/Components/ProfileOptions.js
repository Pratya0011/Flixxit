import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../Style/ProfileOption.css'

function ProfileOptions({ showProfileOptions }) {
    const navigate = useNavigate()
  return (
        <div className={`profile-options ${showProfileOptions ? "active" : ""}`}>
      <ul>
        <li onClick={()=>{navigate('/profile')}}>Profile</li>
        <li onClick={()=>{navigate('/watchlistcomponent')}}>Watchlist</li>
        <li onClick={()=>{navigate('/history')}}>History</li>
        <li onClick={(e)=>{
            localStorage.clear()
            navigate('/')
            window.location.reload()
        }}>Logout</li>
      </ul>
    </div>
  );
}

export default ProfileOptions