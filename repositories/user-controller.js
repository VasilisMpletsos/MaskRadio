const fs = require('fs');
const util = require('util');

class UserController{
  signedUsers = [];
  constructor(filename) {
    if(!filename){
      throw new Error('Requires filename');
    }
    this.filename = filename;
    try{
      fs.accessSync(this.filename);
    }catch(err){
      fs.writeFileSync(this.filename,'[]');
    }

    fs.readFile('signed_users.json', (err, sgnUsers) => {
      this.signedUsers = JSON.parse(sgnUsers);
    });
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

  validateUser(usrname, pswd) {
    return this.signedUsers.find(usr => {
      return usr['username'] == usrname && usr['password'] == pswd;
    });
  }
}

module.exports = new UserController('users.json');
