import React, { useEffect, useState } from "react";

const CountPage = ({ onStart }) => {
  const [count, setCount] = useState(3);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setStarted(true);
      onStart(); // Call the game start function
    }
  }, [count, onStart]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-6xl font-bold">
      {started ? <div>Game Started!</div> : <div>{count}</div>}
    </div>
  );
};

export default CountPage;
