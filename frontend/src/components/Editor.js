import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      theme="snow"
      style={{ backgroundColor: 'white' }}
    />
  );
}

export default Editor;
