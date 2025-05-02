import React, { useState, useEffect, useRef, useContext } from "react";
import { data } from "../../assets/data.js";
import { ScoreProvider } from "../../App.jsx";
import coin from "../../../public/index.js";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const [index, setIndex] = useState(0); // Keeps track of current question index.
  const [score, setScore] = useState(0); // Local raw score count (not the final calculated score).
  const [userAnswer, setUserAnswer] = useState(null); //Tracks the user's selected answer.
  const [showAnswer, setShowAnswer] = useState(false); //Shows correct/incorrect color once answered.
  const [timer, setTimer] = useState(59); //Countdown timer for each question.
  const [quizFinished, setQuizFinished] = useState(false); //Indicates if the quiz has ended.
  const [stars, setStars] = useState([]); //Manages coin/star animations.
  const [totalTime, setTotalTime] = useState(0); //Tracks total time spent across all questions.

  const [userResponses, setUserResponses] = useState([]); //Stores each answer's metadata for the summary.

  const navigate = useNavigate(); //For redirecting to the results page after quiz ends.

  const { score: finalScore, setScore: setFinalScore } =
    useContext(ScoreProvider); //Accesses and updates shared score using context.

  const intervalRef = useRef(null);
  const autoNextTimeoutRef = useRef(null);

  const question = data[index];

  useEffect(() => {
    if (quizFinished) {
      const correct = userResponses.filter(
        (r) => r.selected === r.correct
      ).length;

      const total = data.length;
      const incorrect = userResponses.filter(
        (r) => r.selected !== r.correct
      ).length;

      const unattempted = total - userResponses.length;
      const accuracy = ((correct / total) * 100).toFixed(0);
      const timeSpent = totalTime; // assuming each question has full 60s allocated
      const timePerQuestion = (totalTime / total).toFixed(1);
      const finalScoreValue = correct * 4;

      const summary = {
        finalScore: finalScoreValue,
        correct,
        incorrect,
        unattempted,
        accuracy: `${accuracy}%`,
        timeSpent: `${timeSpent}s`,
        timePerQuestion: `${timePerQuestion}s`,
      };

      navigate("/results", { state: { userResponses, summary } });
    }

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
    setUserResponses((prev) => [
      ...prev,
      {
        question: question.question,
        selected: selectedOption,
        correct: question.ans,
        options: {
          option1: question.option1,
          option2: question.option2,
          option3: question.option3,
          option4: question.option4,
        },
      },
    ]);

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

    setTotalTime(totalTime + (60 - timer));
    console.log("total timer", totalTime);

    if (index + 1 < data.length) {
      setIndex((prev) => prev + 1);
      setUserAnswer(null);
      setShowAnswer(false);
      setTimer(59);
      console.log("timer", timer);
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
    setTimer(59);
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
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 z-10">
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
              className="mt-6 w-full hover:scale-105 transition-all text-white cursor-pointer bg-gray-700  font-bold py-2 px-6 rounded-lg  relative"
            >
              <span className="z-10 relative rounded-lg">Next ▶️</span>
              <div className="absolute top-0 left-0 h-full bg-gray-600 animate-fill rounded-lg"></div>
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Quiz;
