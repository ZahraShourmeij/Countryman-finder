import React, { useState, useEffect, useRef } from "react";

export default function ToastMessage({ show, onClose, title, text }) {
  const TOTAL_TIME = 8000;

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(TOTAL_TIME);

  const [isHovering, setIsHovering] = useState(false);

  const startTimer = () => {
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      onClose();
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    clearTimeout(timerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current -= elapsed;
  };

  useEffect(() => {
    if (show) {
      remainingTimeRef.current = TOTAL_TIME;
      startTimer();
    }

    return () => clearTimeout(timerRef.current);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="toast show"
      onMouseEnter={() => {
        if (!isHovering) {
          setIsHovering(true);
          pauseTimer();
        }
      }}
      onMouseLeave={() => {
        if (isHovering) {
          setIsHovering(false);
          startTimer();
        }
      }}
    >
      <span className="emoji">✨</span>

      <div className="toast-text">
        <strong>{title}</strong>
        <p>{text}</p>
      </div>

      <button
        className="toast-close"
        onClick={() => {
          clearTimeout(timerRef.current);
          onClose();
        }}
      >
        ✖
      </button>
    </div>
  );
}
