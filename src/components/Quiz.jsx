import { useCallback, useState } from "react";

import QUESTION from "../questions.js";
import Questions from "./Questions.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [usersAnswer, setUsersAnswer] = useState([]);

  const activeQuestionIndex = usersAnswer.length;
  const quizIsComplete = activeQuestionIndex === QUESTION.length;

  const handleSelectedAnser = useCallback(function handleSelectedAnser(
    selectedAnswer
  ) {
    setUsersAnswer((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnser(null),
    [handleSelectedAnser]
  );
  if (quizIsComplete) {
    return <Summary usersAnswer={usersAnswer} />
  }

  return (
    <div id="quiz">
      <Questions
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSkip={handleSkipAnswer}
        onHandleSelect={handleSelectedAnser}
      />
    </div>
  );
}
