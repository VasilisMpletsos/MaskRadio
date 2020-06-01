require('dotenv').config({path:__dirname+'/global.env'})

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Ddos = require('ddos')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require("compression");

const utilities = require('./repositories/utilities');
const Playlist = require('./repositories/playlist');
const passport = require('passport');
const load = require('./loaders/index');
const User = require('./models/user');

const apiKey = process.env.AUTH_TOKEN.split(", ");
var key = apiKey[0];

// Youtube Data API v3
const {google} = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: key
});

const port = 3000;

//Creating Server
const app = express();

//<------------Security Sector------------>

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

// Initialise session.
load(app);

//<------------Main Sector------------>

//Form Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use compression for faster excecution
app.use(compression());

//Get Javascript and CSS files
app.use(express.static(__dirname + '/public'));

//Get Page
app.get('/maskRadio', async(req, res) => {
  if(req.isAuthenticated()){
      await res.sendFile(__dirname + '/public/html/index.html');
  }else{
    res.redirect('/signin');
  }
});


app.post('/signin', passport.authenticate('local', { successRedirect: '/maskRadio',
                                                    failureRedirect: '/signin' }));


/**
 * This function is called when the user posts at signup his account information.
 * The prerequisites for the account creation are: the passwords to match and
 * the username to be unique. In every case, the appropriate response is sent.
 */
app.post('/signup', (req, res) => {
  let {username, password, pswdConfirm} = req.body;
  if (password != pswdConfirm) {
    res.send('The passwords do not match.');
    return ;
  }

  let user = new User({username: username, role: 'client'});
  User.register(user,password,function(err,newuser){
    if(err){
      console.log(err);
      return res.redirect('/signup');
    }
    res.redirect('/maskRadio');
  })
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
  const {songId, songTitle, thumbnail, dedicate} = req.body;

  // await songsRepo.create({song: song, for: dedicate, listener: listener});

  console.log(`---> We have to play [${songTitle}] for [${dedicate}]`)
  let song = { 'id': songId, 'title': songTitle, 'thumbnail': thumbnail };
  song['player'] = await youtube.videos.list({ 'part': 'player', 'id': songId });

  // Add the song to the playlist
  playlist.addSong(song);
});

//<------------Start Listening Sector------------>

//Listen to port 3000
app.listen(port);

app.get('/signin',async(req,res)=>{
  await res.sendFile(__dirname + '/public/html/signin.html');
})

app.get('/signup',async(req,res)=>{
  await res.sendFile(__dirname + '/public/html/signup.html');
})

async function searchYT(song) {
  // Search on youtube for the requested song.

  searchResults = await youtube.search.list({
    'q': `${song}`,
    'part': 'snippet',
    'fields': 'items(id(videoId), snippet(title,description, thumbnails(medium(url))))',
    'type': 'video',
    'videoEmbeddable': true,
    'maxResults': 5
  }).catch(err => {
    //console.log(err);
    key = apiKey.shift();
    console.log('New API key is' + key)
    apiKey.push(key);
    youtube = google.youtube({
      version: 'v3',
      auth: apiKey[0]
    });
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

  return songsData;
}
