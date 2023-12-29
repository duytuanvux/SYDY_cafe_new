var express = require('express');
var router = express.Router();

var FeedbackController = require('../controllers/feedback.controller');


router.post('/submit-feedback' , FeedbackController.feedback);
router.get('/average-rating/:item_id' , FeedbackController.getFeedbackForItem);



module.exports = router;
