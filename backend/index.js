const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessionRoutes'); 
const dotenv = require('dotenv');
const cors = require('cors');

require('dotenv').config();
const app = express();

connectDB();

// Middleware
app.use(cors());               
app.use(express.json());       

// Routes
app.use('/api/auth', authRoutes);            
app.use('/api/sessions', sessionRoutes);     

app.get('/', (req, res) => {
  res.send('DevSync API running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server started on port ${PORT}`);
});
