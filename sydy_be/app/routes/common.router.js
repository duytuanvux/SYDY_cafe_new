var express = require("express");
var router = express.Router();

var CommonController = require("../controllers/common.controller");

router.get("/get-category", CommonController.getCategory);
router.get("/get-shipper", CommonController.getShipper);
router.get("/get-status", CommonController.getStatus);


module.exports = router;
