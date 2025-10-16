import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FaUtensils, FaBars, FaTimes, FaSearch } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, setToken, getTotalCartAmount, searchTerm, setSearchTerm } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const currentPath = location.pathname;

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/" className="logo-text" onClick={() => setMobileMenuOpen(false)}>
        <FaUtensils className="logo-icon" /> Testy Food
      </Link>

      {/* Desktop & Mobile Menu */}
      <ul className={`navbar-menu ${mobileMenuOpen ? 'active-mobile' : ''}`}>
        <li>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={currentPath === "/" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className={currentPath === "/menu" ? "active" : ""}>Menu</Link>
        </li>
        <li>
          <a href="#app-download" onClick={() => setMobileMenuOpen(false)}>Mobile App</a>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={currentPath === "/contact" ? "active" : ""}>Contact-Us</Link>
        </li>
      </ul>

      {/* Right Side */}
      <div className="navbar-right">
        {/* Search Input with Clickable Icon */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-input"
          />
          <FaSearch
            className="search-icon"
            onClick={() => document.getElementById("search-input").focus()}
          />
        </div>

        {/* Cart Icon */}
        <div className="navbar-cart">
          <Link to="/cart"><img src={assets.basket_icon} alt="cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* Profile / Auth Buttons */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>Orders</li>
              <hr />
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


