const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a simple root route
app.get('/', (req, res) => {
  res.send('Welcome to the Zomato Backend API');
});

// Define a route for restaurants (GET)
app.get('/api/restaurants', async (req, res) => {
  try {
    // This is just a placeholder, you can fetch data from the database
    const restaurants = [{ name: 'Restaurant 1' }, { name: 'Restaurant 2' }];
    res.json({ restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

// Define a route to add a restaurant (POST)
app.post('/api/restaurants', async (req, res) => {
  try {
    const { name, location } = req.body;
    // You can implement logic to save this data to MongoDB here

    // Placeholder response
    res.json({ message: `Restaurant ${name} added successfully!` });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ message: 'Error adding restaurant' });
  }
});

// Define a route to add a user (POST)
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // You can implement logic to save this data to MongoDB here

    // Placeholder response
    res.json({ message: `User ${username} added successfully!` });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
