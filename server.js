const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
var fileupload = require("express-fileupload");

// Load env vars
dotenv.config({ path: '.env' });

const app = express();

//Connect to Database
connectDB();

//initialize request middleware
app.use(express.json());

// cross-origin
app.use(cors());

app.use(fileupload());

// logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`)
  next();
})

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/entries', require('./routes/api/entries'));
app.use('/api/image', require('./routes/api/image'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Set server port as environment or 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
