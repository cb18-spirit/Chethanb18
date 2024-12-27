const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const upload = multer({ dest: 'uploads/' });

const openai = new OpenAIApi(
  new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY',
  })
);

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(fileBuffer);
    const content = pdfData.text;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate flashcards and questions from the following text:\n\n${content}`,
      max_tokens: 1000,
    });

    res.send(response.data.choices[0].text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing the file.");
  } finally {
    fs.unlinkSync(req.file.path); // Cleanup uploaded file
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
