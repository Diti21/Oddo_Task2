import React, { useState } from 'react';
import Editor from '../components/Editor';
import axios from '../config/axios';

function Ask() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!desc.trim()) {
      alert('Please enter a description');
      return;
    }
    
    try {
      await axios.post('/api/questions', {
        title,
        description: desc,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      });
      alert('Question posted!');
      setTitle('');
      setDesc('');
      setTags('');
    } catch (error) {
      console.error('Error posting question:', error);
      if (error.response?.status === 401) {
        alert('Please login to post questions');
      } else {
        alert('Error posting question');
      }
    }
  };

  return (
    <div>
      <h2>Ask a New Question</h2>
      <input
        type="text"
        value={title}
        placeholder="Enter title"
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Editor value={desc} onChange={setDesc} />
      <input
        type="text"
        value={tags}
        placeholder="Enter tags (comma-separated)"
        onChange={e => setTags(e.target.value)}
        style={{ width: '100%', marginTop: '10px' }}
      />
      <button onClick={handleSubmit} style={{ marginTop: '15px' }}>Submit Question</button>
    </div>
  );
}

export default Ask;
