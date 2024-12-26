// React code for uploading a file and fetching flashcards
import React, { useState } from 'react';

function App() {
    const [flashcards, setFlashcards] = useState([]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8000/generate_flashcards', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setFlashcards(data.flashcards);
    };

    return (
        <div>
            <h1>AI Study Companion</h1>
            <input type="file" onChange={handleFileUpload} />
            <div>
                {flashcards.map((card, index) => (
                    <div key={index}>
                        <h2>{card.question}</h2>
                        <p>{card.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
