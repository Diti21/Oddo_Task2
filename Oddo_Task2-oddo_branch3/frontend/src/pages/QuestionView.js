import React, { useEffect, useState } from 'react';
import axios from '../config/axios';
import { useParams } from 'react-router-dom';
import Editor from '../components/Editor';

function QuestionView() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    axios.get(`/api/questions/${id}`)
      .then(res => setQuestion(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const postAnswer = async () => {
    if (!answer.trim()) {
      alert('Please enter an answer');
      return;
    }
    
    try {
      await axios.post(`/api/questions/${id}/answers`, { body: answer });
      const { data } = await axios.get(`/api/questions/${id}`);
      setQuestion(data);
      setAnswer('');
    } catch (error) {
      console.error('Error posting answer:', error);
      if (error.response?.status === 401) {
        alert('Please login to post answers');
      } else {
        alert('Error posting answer');
      }
    }
  };

  const vote = async (ansId, dir) => {
    try {
      await axios.post(`/api/answers/${ansId}/vote`, { dir });
      const { data } = await axios.get(`/api/questions/${id}`);
      setQuestion(data);
    } catch (error) {
      console.error('Error voting:', error);
      if (error.response?.status === 401) {
        alert('Please login to vote');
      } else {
        alert('Error voting');
      }
    }
  };

  if (!question) return <p>Loading…</p>;

  return (
    <div>
      <h2>{question.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: question.description }} />
      <h3>Answers</h3>
      {question.answers.map(ans => (
        <div key={ans._id} className="question-card">
          <div dangerouslySetInnerHTML={{ __html: ans.body }} />
          <p>Votes: {ans.votes}</p>
          <button onClick={() => vote(ans._id, 1)}>Upvote</button>
          <button onClick={() => vote(ans._id, -1)}>Downvote</button>
        </div>
      ))}
      <h3>Your Answer</h3>
      <Editor value={answer} onChange={setAnswer} />
      <button onClick={postAnswer}>Post Answer</button>
    </div>
  );
}

export default QuestionView;
