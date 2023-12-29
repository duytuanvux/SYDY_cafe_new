const feedbackModel = require('../models/feedback.model');

exports.feedback = async function(req, res) {
    try {
      const feedbackData = {
        item_id: req.body.item_id,
        user_id: req.body.user_id,
        order_id: req.body.order_id,
        rating: req.body.rating,
      };
  
      const feedbackId = await feedbackModel.addFeedback(feedbackData);
      res.send(`Feedback submitted with ID: ${feedbackId}`);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getFeedbackForItem = async (req,res) => {
    const item_id = req.params.item_id
    try {
      const feedback = await feedbackModel.getFeedbackForItem(item_id);
      return feedback;
    } catch (error) {
      throw error;
    }
  };