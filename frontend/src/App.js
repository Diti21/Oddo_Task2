import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Ask from './pages/Ask';
import QuestionView from './pages/QuestionView';
import './styles/App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="logo">StackIt</Link>
        <Link to="/ask" className="ask-button">Ask Question</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/questions/:id" element={<QuestionView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
