import "./App.css";
import React, { useEffect, useState } from "react";
import { reactQues } from "./questions";
function App() {
  const [question, setQuestion] = useState("What is React?");
  const [start, setStart] = useState(false);
  const [secs, setSecs] = useState(60);

  const setNewQuestion = (prev) => {
    let qId = Math.floor(Math.random() * reactQues.length);
    return reactQues[qId];
  };
  useEffect(() => {
    var id = null;
    let timerId = null;
    if (start && secs > 0) {
      timerId = setInterval(() => {
        setSecs((prev) => prev - 1);
      }, 1000);
      id = setInterval(() => {
        setQuestion((prev) => {
          return setNewQuestion(prev);
        });
      }, secs * 1000);
    } else {
      clearInterval(timerId);
      clearInterval(id);
    }
    return () => {
      clearInterval(timerId);
      clearInterval(id);
    };
  }, [start, question, secs]);

  return (
    <div className="App">
      <header className="App-header">
        <h4>{secs}</h4>
        <h2>{question}</h2>
        <div
          style={{
            display: "flex",
          }}
        >
          <button onClick={() => setStart(!start)}>
            {start ? "Stop" : "Start"}
          </button>
          <button
            onClick={() => {
              setQuestion((prev) => {
                return setNewQuestion(prev);
              });
              setSecs(60);
            }}
          >
            NEXT
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
