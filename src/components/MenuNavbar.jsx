import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

export default function Navbar({ user, onLoginClick, onSignupClick, onLogoutClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
const isLoggingOutRef = useRef(false);

const handleConfirmLogout = () => {
  if (isLoggingOutRef.current) return;

  isLoggingOutRef.current = true;

  setShowLogoutModal(false);
  setOpen(false);

  onLogoutClick();

  // ریست بعد از رندر
  setTimeout(() => {
    isLoggingOutRef.current = false;
  }, 0);
};

    const handleScrollLink = (hash) => {
    navigate(`/${hash}`); // مسیر با hash
    setOpen(false);
  };

useEffect(() => {
  setDropdownOpen(false); // وقتی user تغییر کرد، dropdown بسته شود
}, [user]);

useEffect(() => {
  function handleClickOutside(event) {
    const dropdown = document.querySelector(".profile-wrapper");
    if (dropdown && !dropdown.contains(event.target)) {
      setDropdownOpen(false); // کلیک خارج → dropdown بسته شود
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <>
      <nav className="custom-navbar navbar navbar-expand-lg flex">
        <div className="navbar-container w-100 d-flex justify-content-between align-items-center">

          {/* LOGO */}
           <img
            src={Logo}
            alt="logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          {/* HAMBURGER */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOpen(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* DESKTOP MENU */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Home
                </span></li>
              <li className="nav-item"><span
          className="nav-link"
          style={{ cursor: "pointer" }}
          onClick={() => handleScrollLink("#feature")}
        >
          Our Feature
        </span>
        </li>
              <li className="nav-item"><span
          className="nav-link"
          style={{ cursor: "pointer" }}
          onClick={() => handleScrollLink("#AboutUs")}
        >
          About Us
        </span>
        </li>
              <li className="nav-item"><span
          className="nav-link"
          style={{ cursor: "pointer" }}
          onClick={() => handleScrollLink("#contactUs")}
        >
          Contact Us
        </span>
        </li>
            </ul>

 {user ? (
  <div className="profile-wrapper">
    <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
{user.avatar ? (
  <img
    src={user.avatar}
    alt="avatar"
    className="profile-avatar"
  />
) : (
  <FaUserCircle className="profile-avatar-icon" />
)}

      <span>{user.name}</span>
      <svg className={`arrow ${dropdownOpen ? "open" : ""}`} viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5H7z" fill="currentColor"/>
      </svg>
    </button>

    <div className={`profile-dropdown ${dropdownOpen ? "open" : ""}`}>
      <ul>
       <li
  className="dropdown-item logout-item"
  onClick={() => {
    setShowLogoutModal(true); 
    setDropdownOpen(false);
  }}
>
  <FiLogOut className="logout-icon" />
  <span>Logout</span>
</li>

      </ul>
    </div>
  </div>
) : (
  <button className="btn btn-warning login-btn d-none d-md-block" onClick={onLoginClick}>
    Log in
  </button>
)}


          </div>
        </div>
      </nav>

      {/* ✅ OVERLAY */}
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)}></div>
      )}

     <div className={`mobile-menu-top ${open ? "open" : ""}`}>
<div className="menu-header">
  <img src={Logo} alt="logo" className="menu-logo" onClick={() => { setOpen(false); navigate("/"); }} />

  <div className="close-wrapper">
    <button
      className="close-btn"
      onClick={() => setOpen(false)}
    >
      ✕
    </button>
  </div>
</div>

<ConfirmLogoutModal
  show={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handleConfirmLogout}
/>

{/* 🔹 MOBILE USER SECTION */}
{user && (
  <>
    <div className="mobile-user-bar">
      <div className="mobile-user-info">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="mobile-avatar" />
        ) : (
          <FaUserCircle className="mobile-avatar-icon" />
        )}
        <span className="mobile-username">{user.name}</span>
      </div>

  <button
  className="mobile-logout-btn"
  onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLoggingOutRef.current) return;

    setShowLogoutModal(true);
  }}
>
        <FiLogOut />
        Logout
      </button>
    </div>

    <div className="mobile-divider"></div>
  </>
)}

 <ul className={`menu-links ${user ? "logged-in" : ""}`}>
  <li>
    <span
      className="nav-link"
      style={{ cursor: "pointer" }}
      onClick={() => handleScrollLink("#feature")}
    >
      Our Feature
    </span>
  </li>

  <li>
    <span
      className="nav-link"
      style={{ cursor: "pointer" }}
      onClick={() => handleScrollLink("#AboutUs")}
    >
      About Us
    </span>
  </li>

  <li>
    <span
      className="nav-link"
      style={{ cursor: "pointer" }}
      onClick={() => handleScrollLink("#contactUs")}
    >
      Contact Us
    </span>
  </li>
</ul>

{!user && (
  <div className="menu-actions">
    <button
      className="action-btn"
      onClick={() => {
        setOpen(false);
        onLoginClick();
      }}
    >
      Login
    </button>

    <button
      className="action-btn orange"
      onClick={() => {
        setOpen(false);
        onSignupClick();
      }}
    >
      Start for free
    </button>
  </div>
)}

</div>

    </>
  );
}
