var express = require('express');
var router = express.Router();

var ItemController = require('../controllers/item.controller');


router.get('/get-all-items' , ItemController.get_all_items);
router.post('/add-item' , ItemController.add_item);
router.put('/edit-item/:itemId', ItemController.edit_item);
router.get('/get-top-items' , ItemController.get_top_items);



module.exports = router;
