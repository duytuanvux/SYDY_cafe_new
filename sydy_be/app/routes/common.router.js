var express = require("express");
var router = express.Router();

var CommonController = require("../controllers/common.controller");

router.get("/get-category", CommonController.getCategory);

module.exports = router;
