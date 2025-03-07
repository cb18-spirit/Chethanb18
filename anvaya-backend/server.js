const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

// Use Auth Routes (Fix applied ✅)
app.use('/api/auth', require('./routes/authRoutes')); 

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
