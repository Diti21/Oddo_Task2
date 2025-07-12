import React, { useState } from 'react';
import Editor from '../components/Editor';
import axios from 'axios';

function Ask() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('/api/questions', {
        title,
        description: desc,
        tags: tags.split(',').map(tag => tag.trim())
      });
      alert('Question posted!');
    } catch (error) {
      alert('Error posting question');
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
