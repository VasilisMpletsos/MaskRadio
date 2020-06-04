const Ddos = require('ddos')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const compression = require("compression");
const passport = require('passport');
const Playlist = require('../repositories/playlist');
const utilities = require('../repositories/utilities');
const User = require('../models/user');
const Song = require('../models/song');
const { exec } = require("child_process");

module.exports = (app) => {

  var apiKey = process.env.AUTH_TOKEN.split(", ");
  var key = apiKey[0];

  // Youtube Data API v3
  const {google} = require('googleapis');
  var youtube = google.youtube({
    version: 'v3',
    auth: key
  });

  const port = 3000;

  //Listen to port 3000
  app.listen(port);

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

  //Form Parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //Use compression for faster excecution
  app.use(compression());



  app.post('/signin', passport.authenticate('local', { successRedirect: '/maskRadio',failureRedirect: '/signin' }));


  /**
   * This function is called when the user posts at signup his account information.
   * The prerequisites for the account creation are: the passwords to match and
   * the username to be unique. In every case, the appropriate response is sent.
   */
  app.post('/signup', (req, res) => {
    var {username, password, pswdConfirm} = req.body;
    User.findOne({username: username},(err,result)=>{
      if(err){
        return res.send(err.message);
      }
      if(!result){
        if (password != pswdConfirm) {
          return res.send('The passwords must not match.');
        }
        let user = new User({username: username, role: 'client'});
        User.register(user,password,function(err,newuser){
          if(err){
            return res.redirect('/signup');
          }
          passport.authenticate('local', { successRedirect: '/maskRadio',failureRedirect: '/signin' });
          res.redirect('/maskRadio');
        })
      }else{
        return res.send(`Username ${result.username} already exist`)
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
    const {songId, songTitle, thumbnail, dedicate} = req.body;

    // await songsRepo.create({song: song, for: dedicate, listener: listener});


    //We should update this part in order to write them in the Database!
    let song = { 'id': songId, 'title': songTitle, 'thumbnail': thumbnail };
    song['player'] = await youtube.videos.list({ 'part': 'player', 'id': songId });

    // Add the song to the playlist
    let flag = false;
    for(let songF of playlist.songs){
      if (songF.id === songId){flag = true};
    };
    if(!flag){
      exec(`start https://www.youtube.com/watch?v=${songId}`);
      console.log(`---> We have to play [${songTitle}] for [${dedicate}]`)
      playlist.addSong(song);
      let song2 = new Song({ id: songId, title: songTitle, thumbnail: thumbnail });
      song2.save((err,res)=>{if(err){return;}})
    }
  });

  app.get('/maskRadio', async(req, res) => {
    if(req.isAuthenticated()){
        await res.sendFile(process.env.MASKRADIO_PATH);
    }else{
      res.redirect('/signin');
    }
  });


  app.get('/signin',async(req,res)=>{
    await res.sendFile(process.env.SIGNIN_PATH);
  })

  app.get('/signup',async(req,res)=>{
    await res.sendFile(process.env.SIGNUP_PATH);
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
      key = apiKey.shift();
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


};
