const express = require('express');
const bodyParser = require('body-parser');
const songsRepo = require('./repositories/database-control');
const parasitesRepo = require('./repositories/parasite');
const fs = require('fs');
const Ddos = require('ddos')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const compression = require("compression");

const utilities = require('./repositories/utilities');
const Playlist = require('./repositories/playlist');

// Youtube Data API v3
const {google} = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyDSI6C64ulIfl8aqPWrlAHrvxkabzUpFoI'
});

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

// Search youtube based on song title
app.post('/maskRadio/search',async (req,res) => {
  const {song} = req.body;
  songsData = await searchYT(song);
  res.send(songsData);
});

// Create the playlist of the day
var playlist = new Playlist('Default', utilities.getDate());

// Add the selected song to the playlist
app.post('/maskRadio/addToPlaylist',async (req,res) => {
  const {song,dedicate,listener} = req.body;
  console.log(`---> We have to play [${song}] for [${dedicate}]`)

  // await songsRepo.create({song: song, for: dedicate, listener: listener});

  // Add the song
  playlist.addSong(song);
  console.log(playlist.songs);
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

async function searchYT(song) {
  // Search on youtube for the requested song.
  searchResults = await youtube.search.list({
    'q': `${song}`,
    'part': 'snippet',
    'fields': 'items(id, snippet(title,thumbnails))',
    'type': 'video',
    'videoEmbeddable': true,
    'maxResults': 5
  }).catch(err => {
    console.log(err);
  });

  // For each video returned, get it's title and thumbnail and add it to the array
  var songs = searchResults.data.items;
  var songsData = [];
  songs.forEach((song, indx) => {
    songsData.push({
      'id': song['id']['videoId'],
      'title': utilities.parseHTML(song['snippet']['title']),
      'thumbnail': song['snippet']['thumbnails']['medium']['url']
    });
  });

  console.log(searchResults);
  console.log(songsData);

  songsRepo.create(songsData);
  return songsData;
}
