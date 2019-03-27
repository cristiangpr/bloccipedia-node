const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController");
const Wiki = require("../../src/db/models").Wiki;
const validation = require("./validation")
const User = require("../../src/db/models").User;

router.get("/wikis/index", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.post("/wikis/create", wikiController.create);

module.exports = router;
