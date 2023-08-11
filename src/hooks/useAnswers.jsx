import { useEffect, useState } from "react";
import { getDatabase, orderByKey, query, ref, get } from "firebase/database";

export default function useAnswers(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoId + "/questions");
      const answerQuery = query(answerRef, orderByKey());

      try {
        setError("");
        setLoading(true);
        // request to firebase database
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers([...Object.values(snapshot.val())]);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchAnswers();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
