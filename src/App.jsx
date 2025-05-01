import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import { useState, createContext } from "react";
import Results from "./components/Results/Results";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Start from "./components/Start/Start";
import CountPage from "./components/CountPage/CountPage";

export const ScoreProvider = createContext(0);

function App() {
  const [score, setScore] = useState(0);
  return (
    <ScoreProvider.Provider value={{ score, setScore }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/start" element={<Start />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/count" element={<CountPage />} />
        </Routes>
      </BrowserRouter>
    </ScoreProvider.Provider>
  );
}

export default App;
