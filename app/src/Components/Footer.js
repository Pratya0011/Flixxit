import React from 'react'
import '../Style/Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer'>
      <div className='footer-div'>
      <div className='tag'>Flᴉxxᴉt</div>
      <div>
      <div><i className="fa-brands fa-facebook-f"></i></div>
      <div><i className="fa-brands fa-github"></i></div>
      <div><i className="fa-brands fa-instagram"></i></div>
      <div><i className="fa-brands fa-linkedin"></i></div>
      </div>
      </div>
      <div className='contact'>
        <h3>About</h3>
        <p>Subscription based streaming platform</p>
      </div>
      <div className='contact'>
      <h3>Contact</h3>
      <p>pratya0011@gmail.com</p>
      </div>
      </div>
      <div className='copyright'>
        © 2023 All rights reserved. Created by Pratya Kumar Tagore
      </div>
    </div>
  )
}

export default Footer