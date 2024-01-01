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
  
exports.getShipper = async function(req, res) {
  try {
    const data = await CommonModel.getShipper();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getStatus = async function(req, res) {
  try {
    const data = await CommonModel.getStatus();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


