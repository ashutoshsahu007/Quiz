import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaStopwatch,
  FaMinusCircle,
} from "react-icons/fa";
import { GiCoins } from "react-icons/gi";
import { BsSpeedometer2 } from "react-icons/bs";
import { TbTrophy } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ScoreProvider } from "../../App.jsx";

const Results = () => {
  const { score, setScore: setFinalScore } = useContext(ScoreProvider);
  const location = useLocation();
  const { userResponses, summary } = location.state || {};

  const {
    finalScore,
    correct,
    incorrect,
    unattempted,
    accuracy,
    timeSpent,
    timePerQuestion,
  } = summary;

  const cardData = [
    {
      label: "Coin Earned",
      value: finalScore,
      icon: <GiCoins className="text-yellow-400" />,
    },
    {
      label: "Your Score",
      value: finalScore,
      icon: <TbTrophy className="text-yellow-400" />,
    },
    {
      label: "Correct",
      value: correct,
      icon: <FaCheckCircle className="text-green-400" />,
    },
    {
      label: "Incorrect",
      value: incorrect,
      icon: <FaTimesCircle className="text-red-400" />,
    },
    {
      label: "Accuracy",
      value: accuracy,
      icon: <span className="text-red-300">%</span>,
    },
    {
      label: "Time Spent",
      value: timeSpent,
      icon: <FaStopwatch className="text-blue-300" />,
    },
    {
      label: "Unattempted",
      value: unattempted,
      icon: <FaMinusCircle className="text-yellow-300" />,
    },
    {
      label: "Time/Ques",
      value: timePerQuestion,
      icon: <BsSpeedometer2 className="text-cyan-400" />,
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0 },
    });

    const interval = setInterval(() => {
      if (!isActive) return;
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.1 + Math.random() * 0.3 },
      });
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 1000);

    return () => {
      isActive = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#14313E] text-white flex flex-col items-center p-4">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/start">
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-6">
            Computer Applications Quiz 1
          </h1>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#173B4A] rounded-xl p-4 sm:p-6 shadow-lg">
          {cardData.map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#1E4D5F] p-4 rounded-lg flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <span className="flex items-center gap-2">
                {item.icon} {item.label}
              </span>
              <span>{item.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => {
              setFinalScore(0);
              navigate("/quiz");
            }}
            className="bg-purple-700 font-semibold cursor-pointer hover:bg-purple-800 text-white px-6 py-2 rounded-lg shadow-lg w-full sm:w-auto"
          >
            Play Again 🔁
          </button>
          <button
            onClick={() =>
              navigate("/review", { state: { userResponses, summary } })
            }
            className="bg-purple-700 font-semibold cursor-pointer hover:bg-purple-800 text-white px-6 py-2 rounded-lg shadow-lg w-full sm:w-auto"
          >
            Review Questions
          </button>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link to="/leaderboard">
            <button className="bg-purple-800 cursor-pointer hover:bg-purple-900 text-white w-full py-3 rounded-lg font-semibold">
              Leaderboard
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;
