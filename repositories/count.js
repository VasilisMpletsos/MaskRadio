const fs = require('fs');
const util = require('util');

class UsersRepository{
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
    const users = await this.getAll();
    const user = {
      ...attrs
    };
    users.push(user);

    //write all
    await this.writeAll(users);
    return user;
  }

  async writeAll(users){
    await fs.promises.writeFile(this.filename,JSON.stringify(users,null,2));
  }

  async checkUser(user){
    console.log(user);
    const users = await this.getAll();
    var count = 0;
    for (var i=0; i<users.length; i++){
      if(users[i].user === user){
        ++count
      }
    }
    if(count === 0){
      return true;
    }
  }

}

module.exports = new UsersRepository('users.json');
