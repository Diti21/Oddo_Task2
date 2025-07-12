import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "../components/Editor";

export default function QuestionView() {
  const [q, setQ] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    axios.get(`/api/questions/${id}`).then(res => setQ(res.data));
  }, []);

  const postAnswer = async () => {
    await axios.post(`/api/questions/${q._id}/answers`, { body: answer });
    setAnswer("");
    // reload answers
    const { data } = await axios.get(`/api/questions/${q._id}`);
    setQ(data);
  };

  const vote = async (ansId, dir) => {
    await axios.post(`/api/answers/${ansId}/vote`, { dir });
    const { data } = await axios.get(`/api/questions/${q._id}`);
    setQ(data);
  };

  if (!q) return <div>Loading…</div>;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{q.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: q.description }} />
      <hr />
      <h2 className="text-xl">Answers</h2>
      {q.answers.map(a => (
        <div key={a._id} className="p-4 border rounded space-y-2">
          <div dangerouslySetInnerHTML={{ __html: a.body }} />
          <div className="flex space-x-2">
            <button onClick={()=>vote(a._id, 1)}>▲ {a.votes}</button>
            <button onClick={()=>vote(a._id, -1)}>▼</button>
          </div>
        </div>
      ))}
      <hr />
      <h3 className="text-lg">Your Answer</h3>
      <Editor value={answer} onChange={setAnswer} />
      <button onClick={postAnswer} className="px-4 py-2 bg-blue-600 text-white rounded">
        Post Answer
      </button>
    </div>
  );
}
