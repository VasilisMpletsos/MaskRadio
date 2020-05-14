const express = require('express');
const bodyParser = require('body-parser');
const songsRepo = require('./repositories/write');
const parasitesRepo = require('./repositories/parasite');
const fs = require('fs');
const cors = require("cors");
const compression = require("compression");

//  Just for fun i name the listener as parasites in cookie name
// in order to see anonymously ofcourse how many listeners (parasites)
// are sending songs and how many

// For Testing purposes only
// const morgan = require("morgan");

const port = 3000;

//Creating Server
const app = express();

// For Testing purposes only
// app.use(morgan("common"));

//Form Parser
app.use(bodyParser.urlencoded({extended: true}));

//Specify What suer can do
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

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
  console.log(`---> We have to play ${song} for ${dedicate}`)
  await songsRepo.create({song: song, for: dedicate, listener: listener});
});

app.get('/parasite',async(req,res)=>{
  await res.sendFile(__dirname + '/public/html/parasite.html');
})

app.post('/parasite',async(req,res)=>{
  const {parasite} = req.body;
  const data = await songsRepo.countSends(parasite);
  res.send(await parasitesRepo.parasiteRespond(parasite,data));
})


//Listen to port 3000
app.listen(port);
