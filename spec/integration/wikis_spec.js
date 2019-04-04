const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const User = require("../../src/db/models").User;
const sequelize = require('../../src/db/models/index').sequelize;
const Wiki = require("../../src/db/models").Wiki;

describe("routes : wikis", () => {

  beforeEach((done) => { // before each context
    this.user;
    this.wiki;   // define variables and bind to context
    sequelize.sync({ force: true }).then(() => {  // clear database
      User.create({
        username: "example",
        email: "admin@example.com",
        password: "123456",
        role: "standard"
      })
      .then((user) => {
        this.user = user;
      Wiki.create({
        title: "JS Frameworks",
        body: "There is a lot of them",
        userId: this.user.id,
        private: false
      })
      .then((res) => {
        this.wiki = res;  // store resulting topic in context
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });
});


  describe("standard user performing CRUD actions for Wiki", () => {

    beforeEach((done) => {
      User.create({
        username: "LP",
        email: "standard@example.com",
        password: "123456",
        role: "standard"
      })
      .then((user) => {
        request.get({
          url: "http://localhost:3000/auth/fake",
          form: {
            role: user.role,
            username: user.name,
            userId: user.id,
            email: user.email
          }
        },
        (err, res, body) => {
          done();
        });
      });
    });

    describe("GET /wikis/index", () => {

      it("should respond with all wikis", (done) => {
        request.get(`${base}index`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Wikis");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("GET /wikis/new", () => {

      it("should render a view with a new wiki form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
           console.log(body);
          expect(err).toBeNull();
          expect(body).toContain("New Wiki");
          done();
        });
      });

    });

    describe("POST /wikis/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          body: "What's your favorite blink-182 song?"
        }
      };

      it("should create a new wiki and redirect", (done) => {
        request.post(options,
          (err, res, body) => {
            Wiki.findOne({where: {title: "blink-182 songs"}})
            .then((wiki) => {
              expect(wiki.title).toBe("blink-182 songs");
              expect(wiki.body).toBe("What's your favorite blink-182 song?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /wikis/:id", () => {

      it("should render a view with the selected wiki", (done) => {
        request.get(`${base}${this.wiki.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /wikis/:id/destroy", () => {


      it("should delete the wiki with the associated ID", (done) => {
        Wiki.all()
        .then((wikis) => {
          const wikiCountBeforeDelete = wikis.length;

          expect(wikiCountBeforeDelete).toBe(1);

          request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
            Wiki.all()
            .then((wikis) => {
              expect(err).toBeNull();
              expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
              done();
            })

          });
        })

      });

    });

    describe("GET /wikis/:id/edit", () => {

      it("should render a view with an edit wiki form", (done) => {
        request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Wiki");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /wikis/:id/update", () => {

      it("should update the wiki with the given values", (done) => {
        request.post({
          url: `${base}${this.wiki.id}/update`,
          form: {
            title: "JavaScript Frameworks Galore",
            body: "There sure are a lot of them"
          }
        }, (err, res, body) => {
          expect(err).toBeNull();
          Wiki.findOne({
            where: {id:1}
          })
          .then((wiki) => {
            expect(wiki.title).toBe("JavaScript Frameworks Galore");
            done();
          });
        });
      });

    });

  });
});
