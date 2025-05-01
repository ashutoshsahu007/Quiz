import React from "react";
import Bubbles from "../../components/Bubbles/Bubbles";
import GameSection from "../../components/GameSection/GameSection";
import HorizontalScroll from "../../components/HorizontalScroll/HorizontalScroll";

const Home = () => {
  return (
    <div>
      <Bubbles />
      <GameSection />
      <HorizontalScroll />
    </div>
  );
};

export default Home;
