import React from 'react'
import { assets } from '../../assets/assets'
import './footer.css'

const footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} />
                <p>Order fresh and delicious meals from your favorite local restaurants delivered quickly to your door Experience convenience quality and satisfaction with every order you place</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivary</li>
                <li>Privacy policy</li>
              </ul>
            </div>
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+91-887-995-35</li>
                <li>comapny@tomato.com</li>
              </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">copyright-2024 @ tomato.com - all right reserve</p>
    </div>
  )
}

export default footer