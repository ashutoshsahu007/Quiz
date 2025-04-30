import "./App.css";
import Bubbles from "./components/Bubbles/Bubbles";
import GameSection from "./components/GameSection/GameSection";
import Header from "./components/Header/Header";
import Home from "./components/Quiz";
import Svg from "./components/Svg/Svg";

function App() {
  return (
    <div>
      <Header />
      <Bubbles />
      <Svg />
      {/* <Home /> */}
      <GameSection />
    </div>
  );
}

export default App;
