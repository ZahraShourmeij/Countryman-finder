import React, { useState, useEffect } from "react";
import CloseIcon from "../assets/close.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignupModal({ show, onClose, onLoginClick, showToast}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!show) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", { name, email, password, confirmPassword });
   if (showToast) {
      showToast(
        "Welcome!",
        "Your account has been created successfully."
      );
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay show">
      <div className="modal-content signup-modal">
        <div className="modal-header">
          <p>Sign Up</p>
                    <button className="close-btn" onClick={onClose}>
                      <img src={CloseIcon} />
                    </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>

        <div className="signup-link">
          Already have an account?{" "}
          <a href="#" onClick={onLoginClick}>Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
