import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}

      {/* Main Content */}
      <main className="flex-grow bg-purple-900 text-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Create Quiz Section */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">
                Create Quiz
              </h2>
              <p className="mb-8 text-lg">
                Create interactive quizzes in minutes with our online quiz maker
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium">
                Create Quiz
              </button>
            </div>

            {/* Quizard AI Section */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">
                Quizard AI
              </h2>
              <p className="mb-8 text-lg">
                Create quizzes instantly with AI — just enter a topic and get
                engaging questions in seconds!
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-2 rounded-md font-medium">
                Generate Quiz
              </button>
            </div>
          </div>
        </section>

        {/* Wave Divider */}
        <div className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </main>
    </div>
  );
}
