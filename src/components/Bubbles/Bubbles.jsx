import { useEffect } from "react";
import Svg from "../Svg/Svg";

export default function Bubbles() {
  useEffect(() => {
    const numBubbles = 65;
    const container = document.getElementById("bubble-container");

    for (let i = 0; i < numBubbles; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble absolute rounded-full pointer-events-none";
      bubble.style.background = "rgba(255, 255, 255, 0.5)";
      // bubble.style.boxShadow = "0 0 8px rgba(255, 255, 255, 0.5)";
      bubble.style.animation = `float linear infinite`;

      const size = Math.random() * 5 + 2;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      bubble.style.left = `${startX}px`;
      bubble.style.top = `${startY}px`;

      const moveX = (Math.random() - 0.5) * window.innerWidth;
      const moveY = (Math.random() - 0.5) * window.innerHeight;
      bubble.style.setProperty("--x", `${moveX}px`);
      bubble.style.setProperty("--y", `${moveY}px`);

      const duration = Math.random() * 30 + 30;
      bubble.style.animationDuration = `${duration}s`;

      container.appendChild(bubble);
    }
  }, []);

  return (
    <div
      className="w-full min-h-screen overflow-hidden bg-[#461f7f] relative "
      id="bubble-container"
    >
      <style>
        {`
          @keyframes float {
            from {
              transform: translate(0, 0);
            }
            to {
              transform: translate(var(--x), var(--y));
            }
          }

          .bubble {
            animation-name: float;
          }
        `}
      </style>

      <section className="container mx-auto px-4 py-16 z-[100] relative ">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Create Quiz Section */}
          <div className="flex flex-col items-center text-center shadow-[0px_0px_50px_10px_rgba(0,0,0,0.1)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">
              Create Quiz
            </h2>
            <p className="mb-8 text-lg text-white font-semibold">
              Create interactive quizzes in minutes with our online quiz maker
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium">
              Create Quiz
            </button>
          </div>

          {/* Quizard AI Section */}
          <div className="flex flex-col items-center text-center shadow-[0px_0px_50px_10px_rgba(0,0,0,0.1)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">
              Quizard AI
            </h2>
            <p className="mb-8 text-lg text-white font-semibold">
              Create quizzes instantly with AI — just enter a topic and get
              engaging questions in seconds!
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-2 rounded-md font-medium">
              Generate Quiz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
