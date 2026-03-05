// app.js - Main application setup for the URL shortener backend
const express = require('express');
// Import routes for authentication and link management
const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');

// Opretter en Express app og konfigurerer middleware
const app = express();
app.use(express.json()); // Middleware for at parse (analyze) JSON i request body

// Definerer routes for authentication og link management
app.use('/api', authRoutes); // Routes for authentication
app.use('/api', linkRoutes); // Routes for link management

// Eksporterer app for at kunne bruges i server.js
module.exports = app;
//hej