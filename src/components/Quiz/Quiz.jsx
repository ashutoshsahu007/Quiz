import { useRef, useState, useContext, useEffect } from "react";
import classes from "./Quiz.module.css";
import { data } from "../../assets/data.js";
import { ScoreProvider } from "../../App.jsx";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const { score: finalScore, setScore: finalSetScore } =
    useContext(ScoreProvider);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    // Start a timer that updates every second
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          // Stop the timer if the countdown is complete
          clearInterval(intervalId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  });

  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
        finalSetScore(finalScore + 4);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        setSeconds(59);
        return 0;
      }
      setIndex(index + 1);
      setQuestion(data[index]);
      setLock(false);
      setSeconds(59);

      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const next2 = () => {
    if (index === data.length - 1) {
      setResult(true);
      return 0;
    }
    setIndex(index + 1);
    setQuestion(data[index]);
    setLock(false);

    option_array.map((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
      return null;
    });
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  if (remainingSeconds === 0) {
    next2();
    setSeconds(59);
  }

  return (
    <div className={classes.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Quiz App</h1>
        {!result && (
          <p>
            0{minutes}:
            {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
          </p>
        )}
      </div>

      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className={classes.index}>
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            your Score is {score * 4} out of {data.length * 4}
          </h2>
          <button
            onClick={() => {
              reset();
              finalSetScore(0);
            }}
          >
            Reset
          </button>
          <button>
            <Link
              to="/results"
              style={{ color: "white", textDecoration: "none" }}
            >
              Show Results
            </Link>
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
