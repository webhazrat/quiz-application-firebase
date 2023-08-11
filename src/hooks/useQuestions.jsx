import { useEffect, useState } from "react";
import { getDatabase, orderByKey, query, ref, get } from "firebase/database";

export default function useQuestions(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const questionRef = ref(db, "quiz/" + videoId + "/questions");
      const questionsQuery = query(questionRef, orderByKey());

      try {
        setError("");
        setLoading(true);
        // request to firebase database
        const snapshot = await get(questionsQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions([...Object.values(snapshot.val())]);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoId]);

  return {
    loading,
    error,
    questions,
  };
}
