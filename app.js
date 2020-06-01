require('dotenv').config({path:__dirname+'/global.env'})

const express = require('express');
const fs = require('fs');
const loadApp = require('./loaders/appLoader');
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

//Creating Server
const app = express();
load(app);
loadApp(app);
app.use(express.static(__dirname + '/public'));

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
