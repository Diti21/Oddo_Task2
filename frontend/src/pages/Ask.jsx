import React, { useState } from "react";
import axios from "axios";
import Editor from "../components/Editor";

export default function Ask() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");

  const submit = async () => {
    await axios.post("/api/questions", {
      title,
      description: desc,
      tags: tags.split(",").map(t => t.trim())
    });
    alert("Posted!");
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <input
        className="w-full p-2 border rounded"
        placeholder="Title"
        value={title} onChange={e=>setTitle(e.target.value)}
      />
      <Editor value={desc} onChange={setDesc} />
      <input
        className="w-full p-2 border rounded"
        placeholder="Tags (comma‑separated)"
        value={tags} onChange={e=>setTags(e.target.value)}
      />
      <button onClick={submit} className="px-4 py-2 bg-green-500 text-white rounded">
        Submit Question
      </button>
    </div>
  );
}
