const Ddos = require('ddos');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const compression = require("compression");
const passport = require('passport');
const Playlist = require('../repositories/playlist');
const utilities = require('../repositories/utilities');
const User = require('../models/user');

module.exports = (app) => {

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
    let {username, password, pswdConfirm} = req.body;
    if (password != pswdConfirm) {
      res.send('The passwords do not match.');
      return ;
    }

    let user = new User({username: username, role: 'client'});
    User.register(user,password,function(err,newuser){
      if(err){
        console.log(err);
        return res.send(err.message);
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


};
