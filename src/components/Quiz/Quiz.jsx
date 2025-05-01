import React, { useState, useEffect, useRef, useContext } from "react";
import { data } from "../../assets/data.js";
import { ScoreProvider } from "../../App.jsx";

import coin from "../../../public/index.js";

import "./Quiz.css";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(60);
  const [quizFinished, setQuizFinished] = useState(false);
  const [stars, setStars] = useState([]);

  const { score: finalScore, setScore: setFinalScore } =
    useContext(ScoreProvider);

  const intervalRef = useRef(null);
  const autoNextTimeoutRef = useRef(null);

  const question = data[index];

  useEffect(() => {
    if (quizFinished) return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [index, quizFinished]);

  const handleTimeout = () => {
    setShowAnswer(true);
    autoNextTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, 5000);
  };

  const triggerStarAnimation = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newStars = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      left: rect.left + rect.width / 2,
      top: rect.top + rect.height / 2,
    }));
    setStars((prev) => [...prev, ...newStars]);

    setTimeout(() => {
      setStars((prev) => prev.slice(newStars.length));
    }, 1000);
  };

  const handleAnswer = (selectedOption, e) => {
    if (showAnswer) return;

    setUserAnswer(selectedOption);
    setShowAnswer(true);
    clearInterval(intervalRef.current);

    if (selectedOption === question.ans) {
      setScore((prev) => prev + 1);
      setFinalScore(finalScore + 4);
      triggerStarAnimation(e);
    }

    autoNextTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, 5000);
  };

  const goToNext = () => {
    clearTimeout(autoNextTimeoutRef.current);
    clearInterval(intervalRef.current);

    if (index + 1 < data.length) {
      setIndex((prev) => prev + 1);
      setUserAnswer(null);
      setShowAnswer(false);
      setTimer(60);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    clearTimeout(autoNextTimeoutRef.current);
    clearInterval(intervalRef.current);

    setIndex(0);
    setScore(0);
    setFinalScore(0);
    setUserAnswer(null);
    setShowAnswer(false);
    setTimer(60);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 font-mono relative overflow-hidden">
      {/* Star animations */}
      {stars.map((star) => (
        <img
          key={star.id}
          src={coin}
          className="star"
          style={{ left: `${star.left}px`, top: `${star.top}px` }}
          alt="star"
        />
      ))}

      {/* Bubble Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 z-10">
        {/* <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400 animate-pulse">
          🕹️ Quiz Arena
        </h1> */}

        {!quizFinished ? (
          <>
            <div className="flex justify-between items-center text-lg mb-4">
              <span>
                Question {index + 1} of {data.length}
              </span>
              <span className="text-red-400 font-bold">⏱ {timer}s</span>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-blue-300">
              {question.question}
            </h2>

            <ul className="space-y-4">
              {[1, 2, 3, 4].map((option) => {
                const isCorrect = option === question.ans;
                const isUserChoice = option === userAnswer;

                let baseColor = "bg-gray-700 hover:bg-gray-600";
                if (showAnswer) {
                  if (isCorrect) baseColor = "bg-green-600";
                  else if (isUserChoice) baseColor = "bg-red-600";
                }

                return (
                  <li
                    key={option}
                    onClick={(e) => handleAnswer(option, e)}
                    className={`p-4 rounded-xl text-left transition-all cursor-pointer ${baseColor} ${
                      showAnswer ? "cursor-not-allowed" : "hover:scale-105"
                    }`}
                  >
                    {question[`option${option}`]}
                  </li>
                );
              })}
            </ul>

            {showAnswer && (
              <button
                onClick={goToNext}
                className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg transition-all animate-bounce"
              >
                Next ▶️
              </button>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-6 text-green-400 font-bold">
              🎉 Quiz Completed! You scored {score} / {data.length}
            </h2>
            <button
              onClick={resetQuiz}
              className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-lg font-bold text-lg"
            >
              Restart 🔄
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
