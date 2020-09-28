

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

  removeSong(song) {
    let indx = this.songs.indexOf(song);
    if (indx > -1) {
      this.song.splice(indx, 1)
    }
  }
}

module.exports = Playlist;
