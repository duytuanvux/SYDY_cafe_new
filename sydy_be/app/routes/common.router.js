var express = require("express");
var router = express.Router();

var CommonController = require("../controllers/common.controller");

router.get("/get-category", CommonController.getCategory);

router.get("/get-shipper", CommonController.getShipper);
router.post("/add-shipper", CommonController.addShipper);
router.put("/update-shipper/:shipper_id", CommonController.updateShipper);
router.delete("/delete-shipper/:shipper_id", CommonController.deleteShipper);

router.get("/get-status", CommonController.getStatus);
router.get("/get-payment-method", CommonController.getPaymentMethod);


module.exports = router;
