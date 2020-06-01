require('dotenv').config({path:__dirname+'/global.env'})

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Ddos = require('ddos')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const compression = require("compression");

const utilities = require('./repositories/utilities');
const Playlist = require('./repositories/playlist');

const load = require('./loaders/index');
const passport = require('./loaders/passport');

const apiKey = process.env.AUTH_TOKEN.split(", ");
var key = apiKey[0];

// Youtube Data API v3
const {google} = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: key
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

// Initialise session.
load(app);

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
app.use(bodyParser.json());

//Use compression for faster excecution
app.use(compression());

//Get Javascript and CSS files
app.use(express.static(__dirname + '/public'));

//Get Page
app.get('/maskRadio', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});


app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    req.login(user, (err) => {
      console.log(`User logged in: ${JSON.stringify(req.user)}`)
      return res.send('You were authenticated & logged in!\n');
    })
  })(req, res);
});


/**
 * This function is called when the user posts at signup his account information.
 * The prerequisites for the account creation are: the passwords to match and
 * the username to be unique. In every case, the appropriate response is sent.
 */
app.post('/signup', (req, res) => {
  let {usrname, pswd, pswdConfirm} = req.body;
  if (pswd != pswdConfirm) {
    res.send('The passwords do not match.');
    return ;
  }

  let user = new User({username: usrname, password: pswd, role: 'client'});
  user.save(err => {
    if (err) {

      if (err.code == 11000) {
        res.send('The username already exists.');
      } else {
        console.log(`Failed to insert: ${err}`)
        res.send(`We couldn't create your account. Please try again.`);
      }

    } else {
      res.send('Your account has been created.');
    }
  });
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
  const {songId, songTitle, thumbnail, dedicate, listener} = req.body;

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
    console.log(song);
    songsData.push({
      'id': song['id']['videoId'],
      'title': utilities.parseHTML(song['snippet']['title']),
      'thumbnail': song['snippet']['thumbnails']['medium']['url']
    });
  });


  // For UI Debugging purposes
   // songsData = [
   //      {
   //        "id": "r_0JjYUe5jo",
   //        "title": "Eminem - Godzilla ft. Juice WRLD (Dir. by @_ColeBennett_)",
   //        "thumbnail": "https://i.ytimg.com/vi/r_0JjYUe5jo/mqdefault.jpg"
   //      },
   //      {
   //        "id": "RHQC4fAhcbU",
   //        "title": "Eminem - Darkness (Official Video)",
   //        "thumbnail": "https://i.ytimg.com/vi/RHQC4fAhcbU/mqdefault.jpg"
   //      },
   //      {
   //        "id": "_Yhyp-_hX2s",
   //        "title": "Eminem - Lose Yourself [HD]",
   //        "thumbnail": "https://i.ytimg.com/vi/_Yhyp-_hX2s/mqdefault.jpg"
   //      },
   //      {
   //        "id": "XbGs_qK2PQA",
   //        "title": "Eminem - Rap God (Explicit) [Official Video]",
   //        "thumbnail": "https://i.ytimg.com/vi/XbGs_qK2PQA/mqdefault.jpg"
   //      },
   //      {
   //        "id": "YVkUvmDQ3HY",
   //        "title": "Eminem - Without Me (Official Video)",
   //        "thumbnail": "https://i.ytimg.com/vi/YVkUvmDQ3HY/mqdefault.jpg"}];

  //songsRepo.create(songsData);
  return songsData;
}
