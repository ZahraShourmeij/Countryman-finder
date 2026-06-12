import React, { useState, useEffect } from "react";

function ForgotPasswordModal({ show, onClose, showToast }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!show) setEmail("");
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot Password Email:", email);
    if (showToast) {
      showToast(
        "Check your email",
        "We’ve sent you a password reset link 📩"
      );
    }
    onClose();
  };

  return (
    <div className={`modal-overlay ${show ? "show" : ""}`}>
      <div className="modal-content forgot-modal">
        <div className="modal-header">
          <p>Forgot Password</p>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
