import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CountdownStart.css";
import { useNavigate } from "react-router-dom";

const CountdownStart = ({ onStart }) => {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(3);
  const [key, setKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("countdown");
        setKey((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (phase === "countdown") {
      if (count > 0) {
        const timer = setTimeout(() => {
          setCount((prev) => prev - 1);
          setKey((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase("go");
        setKey((prev) => prev + 1);
      }
    }

    //   if (phase === "go") {
    //     const timer = setTimeout(() => {
    //       setPhase("start");
    //       if (onStart) onStart();
    //     }, 1000);
    //     return () => clearTimeout(timer);
    //   }
    // }, [phase, count, onStart]);

    if (phase === "go") {
      const timer = setTimeout(() => {
        navigate("/quiz"); // ✅ Navigate to start page
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, count, navigate]);

  const renderText = () => {
    if (phase === "ready") return "Ready?";
    if (phase === "countdown") return count.toString();
    if (phase === "go") return "Go!";
    return null;
  };

  return (
    <div className="countdown-container">
      {/* Bubble Background */}
      <div className="bubbles">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>

      {/* Animated Text */}
      {phase !== "start" && (
        <motion.div
          key={key}
          initial={{ scale: 0.6 }}
          animate={{ scale: [1.2, 0.95, 1] }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="countdown-text"
        >
          {renderText()}
        </motion.div>
      )}
    </div>
  );
};

export default CountdownStart;
