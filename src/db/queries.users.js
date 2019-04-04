const User = require("./models").User;
const Wiki = require("./models").Wiki;
const bcrypt = require("bcryptjs");



module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      username: newUser.username,
      email: newUser.email,
      role: "standard",

      password: hashedPassword
    })

    .then((user) => {
    



      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  upgradeUser(req, callback){
  return User.findById(req.user.id)
  .then((user) => {

    if(!user){
      callback ("User doesn't exist");
    } else {
      user.update({role: "premium"});
      callback(null, user);
    }
  })
  .catch((err) => {
    callback(err);
  })
},
downgradeUser(req, callback){
  return User.findById(req.user.id)
  .then((user) => {

    if(!user){
      callback ("User doesn't exist");
    } else {
      user.update({role: "standard"});
      callback(null, user);
    }
  })
  .catch((err) => {
    callback(err);
  })
},
downgradeWikis(req, id){
   return Wiki.all()
   .then((wikis) => {
     wikis.forEach((wiki) => {
       if(wiki.userId == req.user.id && wiki.private == true){
         wiki.update({
           private: false
         })
       }
     })
   })
   .catch((err) => {
     callback(err);
   })
 }

}
