const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authroutes');
const complaintRoutes = require('./routes/compliantroutes');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: '*', // Updated origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/auth', authRoutes);
app.use('/api', complaintRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
