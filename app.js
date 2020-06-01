require('dotenv').config({path:__dirname+'/global.env'})

const express = require('express');
const loadApp = require('./loaders/appLoader');
const load = require('./loaders/index');

//Creating Server
const app = express();
app.use(express.static(__dirname + '/public'));
load(app);
loadApp(app);
