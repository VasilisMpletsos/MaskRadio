require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/index');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.static(__dirname + '/../client/public'));

// Configures passport, mongoose and security
config(app);

//Form Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup the routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const songsRouter = require('./routes/songs');
app.use('/songs', songsRouter);


// Start listening
app.listen(port, () => console.log(`Server is running on port: ${port}`));
