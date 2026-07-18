const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health Check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Resource Capacity Planner API is running 🚀'
    });
});

module.exports = app;