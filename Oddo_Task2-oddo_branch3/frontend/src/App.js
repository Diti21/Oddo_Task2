import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Ask from './pages/Ask';
import QuestionView from './pages/QuestionView';
import Login from './components/Login';
import Register from './components/Register';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  const handleRegister = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="logo">StackIt</Link>
        <div className="nav-links">
          {user ? (
            <>
              <span>Welcome, {user.username}!</span>
              <Link to="/ask" className="ask-button">Ask Question</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} className="login-button">Login</button>
              <button onClick={() => setShowRegister(true)} className="register-button">Register</button>
            </>
          )}
        </div>
      </nav>
      
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>&times;</span>
            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}
      
      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRegister(false)}>&times;</span>
            <Register onRegister={handleRegister} />
          </div>
        </div>
      )}
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={user ? <Ask /> : <div>Please login to ask questions</div>} />
          <Route path="/questions/:id" element={<QuestionView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
