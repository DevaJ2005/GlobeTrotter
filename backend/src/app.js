const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const tripRoutes = require('./routes/trip.routes');
const destinationRoutes = require('./routes/destination.routes');
const communityRoutes = require('./routes/community.routes');
const destinationController = require('./controllers/destination.controller'); // For /search

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/trips', tripRoutes);
app.use('/destinations', destinationRoutes);
app.use('/community', communityRoutes);

// Special case for /search
app.get('/search', destinationController.search);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to GlobeTrotter API' });
});

module.exports = app;
