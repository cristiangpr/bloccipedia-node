const Collaborator = require("./models").Collaborator;
const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
  createCollaborator(req, callback){
    console.log('createCollaborator')

  
      Collaborator.create({
        userId: user[0].id,
        wikiId: req.params.id
      })

    .then((collaborator) => {
      callback(null, collaborator);
    })
    .catch((err) => {
      callback(err);
    });
  },
  destroyCollaborator(req, callback){
    console.log('destroyCollaborator')
    Collaborator.destroy({
      where: {
        //username: req.body.collaborator,
        wikiId: req.params.id
      }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    });
  }
}
