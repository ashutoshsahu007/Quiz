import "./App.css";
import GameSection from "./components/GameSection/GameSection";
import Header from "./components/Header/Header";
import Home from "./components/Quiz";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <GameSection />
    </div>
  );
}

export default App;
