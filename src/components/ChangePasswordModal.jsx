import React, { useState, useEffect } from "react";

function ChangePasswordModal({ show, onClose, showToast }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!show) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Change Password Data:", { currentPassword, newPassword });
     if (showToast) {
      showToast(
        "Password updated",
        "Your password has been changed successfully 🔐"
      );
    }
    onClose();
  };

  return (
    <div className={`modal-overlay ${show ? "show" : ""}`}>
      <div className="modal-content change-password-modal">
        <div className="modal-header">
          <p>Change Password</p>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
