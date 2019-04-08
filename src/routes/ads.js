const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/ads", adController.index);

router.get("/ads/new", adController.new);

router.post("ads/create", adController.create);

module.exports = router;
