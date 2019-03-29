const wikiQueries = require("../db/queries.wikis.js");
 const Authorizer = require("../policies/wiki");
 const markdown = require( "markdown" ).markdown;
module.exports = {
  index(req, res, next){
    wikiQueries.getAllWikis((err, wikis) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("wikis/index", {wikis});
      }
    })
  },
  new(req, res, next){
     const authorized = new Authorizer(req.user).new();
     if(authorized) {

         res.render("wikis/new");
       } else {
         req.flash("notice", "You are not authorized to do that.");
         res.redirect("/wikis");
       }
     },


  create(req, res, next){
   const authorized = new Authorizer(req.user).create();
    if(authorized){
    let newWiki = {
      title: req.body.title,
      body: req.body.body,
        userId: req.user.id,
      private: req.body.private,

    };
    console.log(newWiki);
    wikiQueries.addWiki(newWiki, (err, wiki) => {
      if(err){
        res.redirect(500, "/wikis/new");
        console.log("newWiki:failed");
      } else {

       req.flash("notice", "Wiki created");
        res.redirect(303, `/wikis/${wiki.id}`);
        console.log(newWiki);
      }
    });
  }
},
  show(req, res, next){

//#1
    wikiQueries.getWiki(req.params.id, (err, wiki) => {

//#2
      if(err || wiki == null){
        res.redirect(404, "/");
      } else {

        res.render("wikis/show", {wiki, markdown});
      }
    });
  },
  destroy(req, res, next){
    wikiQueries.deleteWiki(req, (err, wiki) => {
        if(err){
          res.redirect(err, `/wikis/${req.params.id}`)
        } else {
          res.redirect(303, "/wikis/index")
        }
      });
    },

 edit(req, res, next){
   wikiQueries.getWiki(req.params.id, (err, wiki) => {
     if(err || wiki == null){
       res.redirect(404, "/");
     } else {
         const authorized = new Authorizer(req.user, wiki).edit();
           if(authorized){
       res.render("wikis/edit", {wiki});
     }  else {
           req.flash("You are not authorized to do that.")
           res.redirect(`/wikis/${req.params.id}`)
   };
 }
})
 },

   update(req, res, next){

    // #1
        wikiQueries.updateWiki(req, req.body, (err, wiki) => {
          if(err || wiki == null){
            res.redirect(401, `/wikis/${req.params.id}/edit`);
          } else {
            res.redirect(`/wikis/${req.params.id}`);
          }
        });
      }
}
