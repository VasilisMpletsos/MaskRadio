const fs = require('fs');
const util = require('util');

class SongsRepository{
  constructor(filename){
    if(!filename){
      throw new Error('Requires filename');
    }
    this.filename = filename;
    try{
      fs.accessSync(this.filename);
    }catch(err){
      fs.writeFileSync(this.filename,'[]');
    }
  }

  async getAll(){
    return JSON.parse(await fs.promises.readFile(this.filename,{enconding: 'utf8'}));
  }

  async create(attrs){
    // Only appending instead of recreating
    const songs = await this.getAll();
    const song = {
      ...attrs
    };
    songs.push(song);

    //write all
    await this.writeAll(songs);
    return song;
  }

  async writeAll(songs){
    await fs.promises.writeFile(this.filename,JSON.stringify(songs,null,2));
  }

  async countSends(listener){
    const songs = await this.getAll();
    var count = 0;
    for (var i=0; i<songs.length; i++){
      if(songs[i].listener === listener){
        ++ count;
      }
    }
    return {count,songs};
  }

}

module.exports = new SongsRepository('songs.json');
