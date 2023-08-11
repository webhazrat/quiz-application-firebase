import { useLocation, useParams } from "react-router-dom";
import Analysis from "../components/Analysis";
import Summary from "../components/Summary";
import Questions from "../components/Questions";
import useAnswers from "../hooks/useAnswers";
import _ from "lodash";

export default function Result() {
  const { id } = useParams();
  const { state: qna } = useLocation();

  const { loading, error, answers } = useAnswers(id);

  function calculateScore() {
    let score = 0;

    answers.forEach((question, index) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score += 5;
      }
    });

    return score;
  }

  const useScore = calculateScore();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}

      {answers && answers.length > 0 && (
        <>
          <Summary score={useScore} noq={answers.length} />
          <Analysis />
          <Questions answers={answers} />
        </>
      )}
    </>
  );
}
