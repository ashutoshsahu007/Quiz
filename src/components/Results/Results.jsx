import React from "react";
import classes from "./Results.module.css";
import { useContext } from "react";
import { ScoreProvider } from "../../App";
import { Link } from "react-router-dom";

const Results = () => {
  const { score, setScore } = useContext(ScoreProvider);

  return (
    <div className={classes.result}>
      <div className={classes.divs}>
        <p>Coin Earned</p>
        <p>{score}</p>
      </div>
      <div className={classes.divs}>
        <p>Your Score</p>
        <p>{score}</p>
      </div>
      <div className={classes.divs}>
        <p>correct</p>
        <p>3</p>
      </div>
      <div className={classes.divs}>
        <p>Incorrect</p>
        <p>7</p>
      </div>
      <div className={classes.divs}>
        <p>Time Spend</p>
        <p>45 sec</p>
      </div>
      <div className={classes.divs}>
        <p>Unattempted</p>
        <p>0</p>
      </div>
      <div className={classes.divs}>
        <p>Time/Ques</p>
        <p>12sec</p>
      </div>
      <div className={classes.button}>
        <Link
          to="/leaderboard"
          style={{ textDecoration: "none", color: "white" }}
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default Results;
