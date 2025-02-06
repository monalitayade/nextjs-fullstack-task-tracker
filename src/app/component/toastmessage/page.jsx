"use client";
import React, { useState, useEffect } from "react";

const ToastPop = ({ message, setError, duration = 5000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setError(null); // Clear error state after timeout
      }, duration);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message, duration, setError]);

  if (!visible) return null;

  return <div className={`toast-msg ${message ? "show" : ""}`}>{message}</div>;
};

export default ToastPop;
