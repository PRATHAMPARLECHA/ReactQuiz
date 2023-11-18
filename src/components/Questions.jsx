import { useState } from "react";

import QuizTimer from "./QuizTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTION from "../questions.js";

export default function Questions({ index, onSkip, onHandleSelect }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTION[index].answers[0] === answer,
      });
      setTimeout(() => {
        onHandleSelect(answer);
      }, 2000);
    }, 1000);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuizTimer
        key={timer}
        timeOut={timer}
        onTimeOut={answerState === "" ? onSkip : null}
        mode={answerState}
      />
      <h2>{QUESTION[index].text}</h2>
      <Answers
        selectedAnswer={answer.selectedAnswer}
        answers={QUESTION[index].answers}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
