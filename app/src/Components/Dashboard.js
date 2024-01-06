import React from 'react'
import Nav from './Nav'
import '../Style/Dashboard.css'
import { Link, NavLink, Outlet } from 'react-router-dom'

function Dashboard() {


  
  return (
    <div className='dashboard-component'>
        <Nav/>
        <div className='dashboard-container'>
          <div className='dashboard-div'>
          <div className="logged-in">
            <div className="loggedinheading">LOGGED IN</div>
            <div className="addressInput">
              {localStorage.getItem('name').toUpperCase()}
            </div>
          </div>
          <div className="accountSettings">
            <div className="account-section">
            <i className="fa-solid fa-bars"></i>Dashboard Info
            </div>
            <div className="list">
              <ul>
                <NavLink to="overview" className={({isActive}) => (isActive ? "activeLink":"link" )}>
                  <li style={{ listStyleType: "none" }}>overview</li>
                </NavLink>
                <NavLink to="subscribeduserlist" className={({isActive}) => (isActive ? "activeLink":"link" )}>
                <li style={{ listStyleType: "none" }}>Subscribed Users</li>
                </NavLink>
              </ul>
            </div>
          </div>
          </div>
          <div className="account-details">
          <Outlet />
        </div>
        </div>
    </div>
  )
}

export default Dashboard;