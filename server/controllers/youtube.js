const apiKeys = process.env.AUTH_TOKEN.split(", ");
var apiIndex = 0;

// Youtube Data API v3
const {google} = require('googleapis');

var youtube = resetYT();


exports.search = async(song) => {
    // Search on youtube for the requested song.
  
    searchResults = await youtube.search.list({
      'q': `${song}`,
      'part': 'snippet',
      'fields': 'items(id(videoId), snippet(title,description, thumbnails(medium(url))))',
      'type': 'video',
      'videoEmbeddable': true,
      'maxResults': 5
    }).catch(err => {
      youtube = resetYT();
    });
  
    //For each video returned, get it's id, title and thumbnail and add it to the array
    let songs = searchResults.data.items;
    let songsData = [];
    songs.forEach(song => {
      songsData.push({
        'id': song['id']['videoId'], 
        'title': song['snippet']['title'],
        'thumbnail': song['snippet']['thumbnails']['medium']['url']
      });
    });
  
    return songsData;
  }

// Returns the player for the song with the specified id.
exports.getPlayer = async(songId) => {
  return await youtube.videos.list({ 'part': 'player', 'id': songId });
}

/* Create a youtube accessor with an api key from the availabe list. 
   Each time this function is called, the api key used is the next one from the list. */
function resetYT() {
  var youtube = google.youtube({
    version: 'v3',
    auth: apiKeys[apiIndex]
  });

  apiIndex = (apiIndex + 1) % apiKeys.length;
  return youtube;
}