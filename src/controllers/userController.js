const userQueries = require("../db/queries.users.js");

const passport = require("passport");
var stripe = require("stripe")("sk_test_mS6drKTpoUlGe9SURiuQYt6S001IWMIlZ7");



module.exports = {
  signUp(req, res, next){
    res.render("users/sign_up");
  },

  create(req, res, next){
//#1
    let newUser = {
      username: req.body.username,
      email: req.body.email,

      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
  console.log(newUser);
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {

// #3
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
  },
  signInForm(req, res, next){
    res.render("users/sign_in");
  },
  signIn(req, res, next){
  passport.authenticate("local")(req, res, function () {
    if(!req.user){
      req.flash("notice", "Sign in failed. Please try again.")
      res.redirect("/users/sign_in");
    } else {
      req.flash("notice", "You've successfully signed in!");
      res.redirect("/");
    }
  })
},
signOut(req, res, next){
   req.logout();
   req.flash("notice", "You've successfully signed out!");
   res.redirect("/");
 },
 upgradeForm(req, res, next){
   res.render("users/upgrade_form") ;
 },
 upgrade(req, res, next){
   userQueries.upgradeUser(req, (err, user) => {
    if(err){
      req.flash("error", err);
      res.redirect("/users/upgrade_form");
    } else {

      const token = request.body.stripeToken; // Using Express

    (async () => {
      const charge = await stripe.charges.create({
        amount: 1500,
        currency: 'usd',
        description: 'Example charge',
        source: token,
        capture: false,
      });
    })();
      res.redirect("/");
      req.flash("notice", "Upgrade Succesful");
    }
  })
},
downgrade(req, res, next){

  userQueries.downgradeUser(req, (err, user) => {
    if(err){
      console.log('err', err)
      req.flash("error", err);
      res.redirect("/users/upgrade_form");
    } else {
      console.log('Downgrade Success')
      res.redirect("/");
    }
  });
}


 }
