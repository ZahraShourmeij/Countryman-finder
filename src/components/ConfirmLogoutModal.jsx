import React from "react";
import CloseIcon from "../assets/close.svg";


function ConfirmLogoutModal({ show, onClose, onConfirm }) {
  if (!show) return null; // اگر باز نیست، هیچ چیزی render نشه


  return (
    <div className={`modal-overlay ${show ? "show" : ""}`}>
      <div className="modal-content login-modal">
        <div className="modal-header">
          <p>Log out</p>
          <button className="close-btn" onClick={onClose}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>

        <div className="modal-body">
          <p>Are you sure you want to log out?</p>
        </div>

        <div className="modal-actions" style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "0.5rem" }}>
<button
  className="Logout-submit-btn"
  onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  }}
>
  Cancel
</button>

<button
  className="Logout-submit-btn orange"
  onClick={onConfirm}
>
  Log out
</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLogoutModal;
