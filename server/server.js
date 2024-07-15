require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/OAuth');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});



// Define PORT from .env, or default to 3000 if not specified
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));