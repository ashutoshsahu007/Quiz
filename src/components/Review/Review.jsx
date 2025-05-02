import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Review = () => {
  const location = useLocation();
  const { userResponses, finalScore } = location.state || {};
  const responses = userResponses;

  const navigate = useNavigate();

  console.log(finalScore);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 font-mono">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">
        📊 Quiz Results
      </h1>

      {responses.map((res, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg p-5 mb-5 border border-gray-700"
        >
          <h2 className="text-blue-300 text-xl mb-3">
            {index + 1}. {res.question}
          </h2>

          <ul className="space-y-2">
            {[1, 2, 3, 4].map((num) => {
              const isCorrect = num === res.correct;
              const isSelected = num === res.selected;

              let bg = "bg-gray-700";
              if (isCorrect) bg = "bg-green-600";
              if (isSelected && !isCorrect) bg = "bg-red-600";

              return (
                <li key={num} className={`p-3 rounded ${bg}`}>
                  {res.options[`option${num}`]}
                  {isSelected && <span className="ml-2">← Your Answer</span>}
                  {isCorrect && <span className="ml-2">✅</span>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg"
      >
        Play Again 🔁
      </button>
    </div>
  );
};

export default Review;
