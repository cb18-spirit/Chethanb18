import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      setResult("Error generating flashcards.");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      <div>
        <h3>Generated Flashcards:</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default UploadForm;
