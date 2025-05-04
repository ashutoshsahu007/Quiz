import React, { useState, useEffect, useRef, useContext } from "react";
import { data } from "../../assets/data.js";
import { ScoreProvider } from "../../App.jsx";
import coin from "../../../public/index.js";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(59);
  const [quizFinished, setQuizFinished] = useState(false);
  const [stars, setStars] = useState([]);
  const totalTime = useRef(0);
  const [userResponses, setUserResponses] = useState([]);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const autoNextTimeoutRef = useRef(null);
  const question = data[index];
  const { score: finalScore, setScore: setFinalScore } =
    useContext(ScoreProvider);
  const score = useRef(0);

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

  useEffect(() => {
    if (quizFinished) {
      const correct = userResponses.filter(
        (r) => r.selected === r.correct
      ).length;
      const total = data.length;
      const incorrect = userResponses.filter(
        (r) => r.selected !== r.correct && r.selected !== null
      ).length;
      const unattempted = userResponses.filter(
        (r) => r.selected === null
      ).length;
      const accuracy = ((correct / total) * 100).toFixed(2);
      const timeSpent = totalTime.current;
      const timePerQuestion = (totalTime.current / total).toFixed(1);
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
          handleTimeout(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [index, quizFinished]);

  const handleTimeout = (prev) => {
    setShowAnswer(true);
    console.log("timer in handletiemout", prev);
    autoNextTimeoutRef.current = setTimeout(() => {
      goToNext(prev);
    }, 5000);
  };

  const handleAnswer = (selectedOption, e) => {
    if (showAnswer) return;

    setUserAnswer(selectedOption);
    setShowAnswer(true);
    clearInterval(intervalRef.current);

    const isCorrect = selectedOption === question.ans;
    const earnedScore = isCorrect ? 4 : 0;

    setUserResponses((prev) => [
      ...prev,
      {
        question: question.question,
        time: 59 - timer,
        score: score.current || earnedScore,
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

    if (isCorrect) {
      score.current = 4;
      setFinalScore(finalScore + 4);
      triggerStarAnimation(e);
    } else {
      score.current = 0;
    }

    autoNextTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, 5000);
  };

  const goToNext = (prev) => {
    const safePrev = typeof prev === "number" ? prev : timer;
    totalTime.current = totalTime.current + 59 - safePrev;
    console.log("timer in gotonexr", timer);

    console.log("prev in gotonext", prev);

    console.log("total time", totalTime.current);

    // Record unattempted question
    if (!userAnswer) {
      setUserResponses((prev) => [
        ...prev,
        {
          question: question.question,
          time: 59 - timer,
          score: score.current,
          selected: null,
          correct: question.ans,
          options: {
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
          },
        },
      ]);
    }

    clearTimeout(autoNextTimeoutRef.current);
    clearInterval(intervalRef.current);

    if (index + 1 < data.length) {
      setIndex((prev) => prev + 1);
      setUserAnswer(null);
      setShowAnswer(false);
      setTimer(59);
    } else {
      setQuizFinished(true);
    }
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
        {Array.from({ length: 13 }).map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
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
