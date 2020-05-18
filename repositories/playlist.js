

class Playlist {
  songs = [];
  constructor(name, date, songs) {
    this.name = name;
    this.date = date;
    if (typeof songs != 'undefined') {
        this.songs = songs;
    }

    this.playing = false;
  }

  addSong(song) {
    this.songs.push(song);
  }
}

module.exports = Playlist;
