const express = require('express');
const bodyParser = require('body-parser');
const songsRepo = require('./repositories/database-control');
const usersRepo = require('./repositories/count');
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
var ddos = new Ddos({burst:50, limit:100})
app.use(ddos.express);

//Limiting Requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
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

// Add the selected song to the userPlaylist
app.post('/maskRadio/addToPlaylist',async (req,res) => {
  const {songId, songTitle, dedicate, listener} = req.body;

  // await songsRepo.create({song: song, for: dedicate, listener: listener});

  console.log(`---> We have to play [${songTitle}] for [${dedicate}]`)

  song['player'] = await youtube.videos.list({
    'part': 'player',
    'id': songId
  });
  // Add the song
  playlist.addSong(song);
  console.log(playlist.songs);
});

app.post('/count',async (req,res) => {
  const {parasite} = req.body;
  const flag = await usersRepo.checkUser(parasite);
  if(flag){
      await usersRepo.create({user: parasite});
  }
});

app.get('/parasite',async(req,res)=>{
  await res.sendFile(__dirname + '/public/html/parasite.html');
})

app.post('/parasite',async(req,res)=>{
  const {parasite} = req.body;
  const {count,songs} = await songsRepo.countSends(parasite);
  res.send(await parasitesRepo.parasiteRespond(parasite,count));
  //console.log(songs);
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

  //For each video returned, get it's id, title and thumbnail and add it to the array
  let songs = searchResults.data.items;
  let songsData = [];
  songs.forEach((song, indx) => {
    songsData.push({
      'id': song['id']['videoId'],
      'title': utilities.parseHTML(song['snippet']['title']),
      'thumbnail': song['snippet']['thumbnails']['medium']['url']
    });
  });

  // For UI Debugging purposes
  //  songsData = [
  //       {
  //         "id": "r_0JjYUe5jo",
  //         "title": "Eminem - Godzilla ft. Juice WRLD (Dir. by @_ColeBennett_)",
  //         "thumbnail": "https://i.ytimg.com/vi/r_0JjYUe5jo/mqdefault.jpg"
  //       },
  //       {
  //         "id": "RHQC4fAhcbU",
  //         "title": "Eminem - Darkness (Official Video)",
  //         "thumbnail": "https://i.ytimg.com/vi/RHQC4fAhcbU/mqdefault.jpg"
  //       },
  //       {
  //         "id": "_Yhyp-_hX2s",
  //         "title": "Eminem - Lose Yourself [HD]",
  //         "thumbnail": "https://i.ytimg.com/vi/_Yhyp-_hX2s/mqdefault.jpg"
  //       },
  //       {
  //         "id": "XbGs_qK2PQA",
  //         "title": "Eminem - Rap God (Explicit) [Official Video]",
  //         "thumbnail": "https://i.ytimg.com/vi/XbGs_qK2PQA/mqdefault.jpg"
  //       },
  //       {
  //         "id": "YVkUvmDQ3HY",
  //         "title": "Eminem - Without Me (Official Video)",
  //         "thumbnail": "https://i.ytimg.com/vi/YVkUvmDQ3HY/mqdefault.jpg"}];

  //songsRepo.create(songsData);
  return songsData;
}
