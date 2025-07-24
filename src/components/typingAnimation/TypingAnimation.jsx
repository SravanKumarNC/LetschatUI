import React, { useState, useEffect } from "react";
import "./TypingIndicator.css"; // Create this file

const TypingIndicator = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.length < 3 ? prevDots + "." : "";
      });
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="typing-indicator">
      <span className=" text-green-400">typing{dots}</span>
    </div>
  );
};

export default TypingIndicator;
