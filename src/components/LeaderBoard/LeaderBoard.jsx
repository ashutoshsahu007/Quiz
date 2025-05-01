import React, { useState } from "react";
import classes from "./LeaderBoard.module.css";
import List from "../List/List";

const LeaderBoard = () => {
  let arrayOfObjects = [];

  const [load, setLoad] = useState(10);

  for (let i = 1; i <= load; i++) {
    let obj = {
      name: `Name${i}`,
      listNumber: i,
      randomNumber: Math.floor(Math.random() * 100) + 1,
    };
    arrayOfObjects.push(obj);
  }

  const handleClick = () => {
    setLoad(load + 10);
  };

  return (
    <div className={classes.leaderboard}>
      <div className={classes.heading}>
        <h1>LeaderBoard</h1>
      </div>
      <div>
        {arrayOfObjects.map((item) => {
          return <List key={item.listNumber} item={item} />;
        })}
      </div>
      <div onClick={handleClick} className={classes.load}>
        Load
      </div>
    </div>
  );
};

export default LeaderBoard;
