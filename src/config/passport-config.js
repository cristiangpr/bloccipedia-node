const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){

// #2
    app.use(passport.initialize());
    app.use(passport.session());

// #3
    passport.use(new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
          console.log(User);
      User.findOne({
        where: { email }
      })
      .then((user) => {

// #4
        if (!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, { message: "Invalid email or password" });
        }
// #5
        return done(null, user);
      })
    }));

// #6
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

// #7
    passport.deserializeUser((id, callback) => {
      console.log(User);

      User.findById(id)
      .then((user) => {
        callback(null, user);
      })
      .catch((err =>{
        callback(err, user);
      }))

    });
  }
}
