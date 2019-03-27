const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const User = require("../../src/db/models").User;
const sequelize = require('../../src/db/models/index').sequelize;
const Wiki = require("../../src/db/models").Wiki;
describe("GET /wikis/new", () => {

   it("should render a new wiki form", (done) => {
     request.get(`${base}new`, (err, res, body) => {
       expect(err).toBeNull();
       expect(body).toContain("New Wiki");
       done();
     });
   });
