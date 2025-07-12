import React, { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Recent Questions</h2>
      {questions.map(q => (
        <div key={q._id} className="question-card">
          <Link to={`/questions/${q._id}`}><h3>{q.title}</h3></Link>
          <p>Tags: {q.tags.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
