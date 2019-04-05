const express = require("express");
const router = express.Router();

const addController = require("../controllers/addController");

router.get("/adds", addController.index);

router.get("/adds/new", addController.new);

router.post("/adds/create", addController.create);

module.exports = router;
