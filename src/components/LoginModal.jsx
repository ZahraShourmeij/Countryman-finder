import React, { useState, useEffect } from "react";
import CloseIcon from "../assets/close.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function LoginModal({ show, onClose, onSignupClick, onForgotClick, showToast, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
    }
  }, [show]);

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Login Data:", { email, password });

  const loggedInUser = {
    name: email.split("@")[0], // مثلا نام از ایمیل
    avatar: null, // یا لینک عکس واقعی
    email: email
  };
  
  if (setUser) {
    setUser(loggedInUser); // ← کاربر رو به App اطلاع میده
  }

  if (showToast) {
    showToast(
      "Login Successful",
      "You have successfully logged in to your account."
    );
  }

  onClose(); // مودال بسته شود
};


  return (
    <div className={`modal-overlay ${show ? "show" : ""}`}>
      <div className="modal-content login-modal">
        <div className="modal-header">
          <p>Login</p>
          <button className="close-btn" onClick={onClose}>
            <img src={CloseIcon} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
<label>Password</label>

<div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEye /> : <FaEyeSlash /> }
  </span>
</div>

          <div className="forgot-password">
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onForgotClick(); // حالا prop وجود داره
    }}
  >
    Forgot Password?
  </a>
</div>


          <button type="submit" className="submit-btn">Login</button>
        </form>

        <div className="signup-link">
          Don’t have an account? <a onClick={onSignupClick} href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
