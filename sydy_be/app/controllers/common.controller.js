const CommonModel = require('../models/common.model')

exports.getCategory = async function(req, res) {
    try {
      const categories = await CommonModel.getCategory();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


