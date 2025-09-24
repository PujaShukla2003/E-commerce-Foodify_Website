import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FaUtensils, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => { 
    const [menu, setMenu] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    // Scroll smoothly to section
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className='navbar'>
            {/* 🔹 Logo */}
            <Link to='/' className="logo-text">
                <FaUtensils className="logo-icon" /> Testy Food
            </Link>

            {/* 🔹 Desktop & Mobile Menu */}
            <ul className={`navbar-menu ${mobileMenuOpen ? 'active-mobile' : ''}`}>
                <li>
                    <Link 
                      to='/' 
                      onClick={() => { setMenu("home"); setMobileMenuOpen(false); scrollToSection("home"); }} 
                      className={menu === "home" ? "active" : ""}>
                      Home
                    </Link>
                </li>
                <li>
                    <a 
                      href='#explore-menu' 
                      onClick={() => { setMenu("menu"); setMobileMenuOpen(false); scrollToSection("explore-menu"); }} 
                      className={menu === "menu" ? "active" : ""}>
                      Menu
                    </a>
                </li>
                <li>
                    <a 
                      href='#app-download' 
                      onClick={() => { setMenu("mobile-app"); setMobileMenuOpen(false); scrollToSection("app-download"); }} 
                      className={menu === "mobile-app" ? "active" : ""}>
                      Mobile App
                    </a>
                </li>
                <li>
                    <a 
                      href='#contact' 
                      onClick={() => { setMenu("contact-us"); setMobileMenuOpen(false); scrollToSection("contact-us"); }} 
                      className={menu === "contact-us" ? "active" : ""}>
                      Contact-Us
                    </a>

                </li>
            </ul>

            {/* 🔹 Right Side */}
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="orders" /><p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="logout" /><p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Mobile Hamburger Icon */}
                <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
