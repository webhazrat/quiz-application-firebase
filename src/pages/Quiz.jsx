import { useLocation, useNavigate, useParams } from "react-router-dom";
import Answers from "../components/Answers";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useReducer, useState } from "react";
import useQuestions from "../hooks/useQuestions";
import { useAuth } from "../contexts/AuthContext";
import _ from "lodash";
import { getDatabase, ref, set } from "firebase/database";

const intialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentUser } = useAuth();

  const [qna, dispath] = useReducer(reducer, intialState);

  useEffect(() => {
    dispath({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispath({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // next question
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

  // prev question
  function prevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }

  // submit quiz
  async function saveQuiz() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, { state: qna });
  }

  // calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h1 className="font-medium text-lg">
              {qna[currentQuestion].title}
            </h1>
            <p className="text-gray-500">Question can have multiple answers</p>
          </div>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            save={saveQuiz}
            progress={percentage}
            youtubeId={id}
            title={state.title}
          />
        </>
      )}
    </>
  );
}
