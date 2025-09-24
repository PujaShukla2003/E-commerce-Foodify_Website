import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FaUtensils,  } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <Link to='/' className="logo-text">
                                  <FaUtensils className="logo-icon" /> Testy Food
                                </Link>
                    <p>Discover deliciousness in every bite! Our dishes are crafted with fresh ingredients, bringing you a perfect blend of taste, quality, and convenience.</p>
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
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9334966286</li>
                        <li>shuklapuja2003@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2025 © Food_Order -  All Rights Reserved.</p>
        </div>
    )
}

export default Footer