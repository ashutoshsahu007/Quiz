import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScoreProvider } from "../../App.jsx";

const Review = () => {
  const location = useLocation();
  const { userResponses, summary } = location.state || {};
  const responses = userResponses || [];
  const { score: finalScore, setScore: setFinalScore } =
    useContext(ScoreProvider);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 md:px-10 py-6 font-mono">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-8">
        📊 Quiz Results
      </h1>

      <div className="space-y-6">
        {responses.map((res, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700 shadow-md"
          >
            <h2 className="text-blue-300 text-lg md:text-xl font-semibold mb-2">
              {index + 1}. {res.question}
            </h2>
            <div className="text-sm md:text-base text-gray-300 mb-3 flex flex-wrap gap-4">
              <span>⏱️ Time: {res.time}s</span>
              <span>💰 Coins: {res.score}</span>
            </div>

            <ul className="space-y-3">
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
              {res.selected === null && (
                <li className="p-3 rounded bg-yellow-500 text-black font-bold">
                  ❗ Question not attempted
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            setFinalScore(0);
            navigate("/quiz");
          }}
          className="bg-yellow-500 cursor-pointer hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg transition duration-200"
        >
          Play Again 🔁
        </button>
      </div>
    </div>
  );
};

export default Review;
