import React, { useState } from "react";
import { motion } from "framer-motion";

const generateLeaderboardData = (count = 10, startIndex = 0) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Name${startIndex + i + 1}`,
    score: Math.floor(Math.random() * 100) + 1,
  }));
};

const Leaderboard = () => {
  const [users, setUsers] = useState(generateLeaderboardData(20));
  const [loadCount, setLoadCount] = useState(20);

  const sortedData = [...users].sort((a, b) => b.score - a.score);
  const topThree = sortedData.slice(0, 3);
  const rest = sortedData.slice(3);

  const handleLoadMore = () => {
    const newUsers = generateLeaderboardData(10, users.length);
    setUsers([...users, ...newUsers]);
    setLoadCount(loadCount + 10);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-10">
        Leaderboard
      </h1>

      <div className="flex justify-center items-end gap-6 mb-10">
        {/* 2nd (slide in from left) */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <div className="text-3xl">🥈</div>
          <div className="bg-blue-500 rounded-lg px-6 py-4">
            {topThree[1]?.name}
          </div>
          <p className="mt-1">{topThree[1]?.score}</p>
        </motion.div>

        {/* 1st (slide in from top) */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          <div className="text-4xl">👑</div>
          <div className="bg-yellow-500 rounded-lg px-8 py-6 font-semibold text-black">
            {topThree[0]?.name}
          </div>
          <p className="mt-1">{topThree[0]?.score}</p>
        </motion.div>

        {/* 3rd (slide in from right) */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <div className="text-3xl">🥉</div>
          <div className="bg-green-500 rounded-lg px-6 py-4">
            {topThree[2]?.name}
          </div>
          <p className="mt-1">{topThree[2]?.score}</p>
        </motion.div>
      </div>

      {/* Remaining players list */}
      <div className="bg-slate-800 rounded-lg p-6 max-w-md mx-auto space-y-2 mb-6">
        {rest.map((user, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center bg-slate-700 px-4 py-2 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.5 + index * 0.08 }}
          >
            <span>{user.name}</span>
            <span className="text-yellow-400 font-medium">🏅 {user.score}</span>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button
          onClick={handleLoadMore}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
