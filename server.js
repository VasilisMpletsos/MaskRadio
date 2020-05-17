const express = require('express');
const bodyParser = require('body-parser');
const songsRepo = require('./repositories/write');
const parasitesRepo = require('./repositories/parasite');
const fs = require('fs');
const Ddos = require('ddos')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const compression = require("compression");
// For Testing purposes only
// const morgan = require("morgan");

//  Just for fun i name the listener as parasites in cookie name
// in order to see anonymously ofcourse how many listeners (parasites)
// are sending songs and how many

const port = 3000;

//Creating Server
const app = express();

//<------------Security Sector------------>

// For Testing purposes only
// app.use(morgan("common"));

//For Security Reasons
app.use(helmet());

//Protecting against ddos attacks
var ddos = new Ddos({burst:10, limit:15})
app.use(ddos.express);

//Limiting Requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message:"Too many attempts from this IP, please try again after 10 minutes"
});
app.use(limiter);

//Specify What user can do
//This should be changed for cunnrent external ip address
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//<------------Main Sector------------>

//Form Parser
app.use(bodyParser.urlencoded({extended: true}));

//Use compression for faster excecution
app.use(compression());

//Get Javascript and CSS files
app.use(express.static(__dirname + '/public'));

//Get Page
app.get('/maskRadio',async function(req, res) {
  await res.sendFile(__dirname + '/public/html/index.html');
});

//Post Song
app.post('/maskRadio',async (req,res) => {
  const {song,dedicate,listener} = req.body;
  await songsRepo.create({song: song, for: dedicate, listener: listener});
});

app.get('/parasite',async(req,res)=>{
  await res.sendFile(__dirname + '/public/html/parasite.html');
})

app.post('/parasite',async(req,res)=>{
  const {parasite} = req.body;
  const {count,list} = await songsRepo.countSends(parasite);
  res.send(await parasitesRepo.parasiteRespond(parasite,count));
  console.log(list);
})

//<------------Start Listening Sector------------>

//Listen to port 3000
app.listen(port);
