import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.get("/api/questions").then(res => setQuestions(res.data));
  }, []);
  return (
    <div className="space-y-4">
      {questions.map(q => (
        <div key={q._id} className="p-4 border rounded">
          <Link to={`/questions/${q._id}`} className="text-xl font-semibold">
            {q.title}
          </Link>
          <p className="text-sm text-gray-600">Tags: {q.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
