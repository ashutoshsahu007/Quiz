import React from "react";
import classes from "./List.module.css";

const List = ({ item }) => {
  const { name, listNumber, randomNumber } = item;
  return (
    <div className={classes.list}>
      <div>{listNumber}</div>
      <div>{name}</div>
      <div>{randomNumber}</div>
    </div>
  );
};

export default List;
