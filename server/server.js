require('dotenv').config()
const express = require('express');
const cors = require('cors');


const loadApp = require('./config/appLoader');
const config = require('./config/index');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/../client/public'));


config(app);
loadApp(app);

// Setup the routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Start listening
app.listen(port, () => console.log(`Server is running on port: ${port}`));
