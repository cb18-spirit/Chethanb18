from flask import Flask, request, jsonify, render_template
import joblib
import re
import nltk
import numpy as np
import tensorflow as tf
import pickle
from nltk.corpus import stopwords
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Download stopwords
nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

# Load ML Model & Vectorizer
ml_model = joblib.load("fake_news_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Load LSTM Deep Learning Model
dl_model = tf.keras.models.load_model("fake_news_lstm.h5")
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

# Initialize Flask App
app = Flask(__name__)

# 🔹 Function to preprocess text
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\W', ' ', text)
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

# 🔹 Route for homepage
@app.route("/")
def home():
    return render_template("index.html")

# 🔹 Prediction API (Supports ML & DL Models)
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    news_text = data.get("news", "")
    model_type = data.get("model", "ml")  # Default: ML model

    if not news_text:
        return jsonify({"error": "No news text provided"}), 400

    # Preprocess input text
    clean_text = preprocess_text(news_text)

    if model_type == "ml":
        # Use ML Model (TF-IDF + SVM/Random Forest)
        text_vectorized = vectorizer.transform([clean_text]).toarray()
        prediction = ml_model.predict(text_vectorized)[0]
        result = "Real News ✅" if prediction == 1 else "Fake News ❌"

    elif model_type == "dl":
        # Use Deep Learning Model (LSTM)
        sequence = tokenizer.texts_to_sequences([clean_text])
        padded_sequence = pad_sequences(sequence, maxlen=100)
        prediction = dl_model.predict(padded_sequence)[0][0]
        result = "Real News ✅" if prediction >= 0.5 else "Fake News ❌"

    else:
        return jsonify({"error": "Invalid model type. Use 'ml' or 'dl'."}), 400

    return jsonify({"prediction": result, "confidence": float(prediction)})

# Run Flask App
if __name__ == "__main__":
    app.run(debug=True)
