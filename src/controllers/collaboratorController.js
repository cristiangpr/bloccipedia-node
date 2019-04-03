const collaboratorQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");

module.exports = {

  create(req, res, next){
    console.log("collaboratorController Create Called Successfully")
    collaboratorQueries.createCollaborator(req, (err, collaborator) => {
      if(err){
        console.log(err);
        req.flash("error", err);
      }
      console.log("success")
      console.log(collaborators)
      res.redirect(`/wikis/${req.params.id}`);
    });
  },

  destroy(req, res, next){
    console.log("collaboratorController destroy Called Successfully");
    collaboratorQueries.destroyCollaborator(req, (err, collaborator) => {
      if(err){
        console.log("ERROR", err);
        req.flash("error", err);
        res.redirect(typeof err == "number" ? err : 500, req.headers.referer);
      } else {
        console.log("success")
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  }
}
