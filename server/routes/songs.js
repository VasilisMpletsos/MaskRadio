const router = require('express').Router();

const Playlist = require('../controllers/playlist');
const utilities = require('../controllers/helper');
const youtube = require('../controllers/youtube');

// Search youtube based on song title
router.post('/search', async (req,res) => {
    const {song} = req.body;
    songsData = await youtube.search(song);
    res.send(songsData);
  });
  
// Create the playlist of the day
var playlist = new Playlist('Default', utilities.getDate());

// Add the selected song to the userPlaylist
router.post('/addToPlaylist', async ( req, res ) => {
    const {songId, songTitle, thumbnail } = req.body;

    console.log(`---> Adding ${songTitle} to the playlist..`)
    let song = { 'id': songId, 'title': songTitle, 'thumbnail': thumbnail };
    song['player'] = await youtube.getPlayer(songId);

    playlist.addSong(song);
    
});


module.exports = router;