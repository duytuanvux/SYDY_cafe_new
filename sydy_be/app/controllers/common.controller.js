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
exports.addShipper = async function(req, res) {
  try {
    const newShipperData = req.body;
    newShipperData.isActive = 1;
    const data = await CommonModel.addShipper(newShipperData);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.updateShipper = async function(req, res) {
  try {
    const shipperIdToUpdate = req.params.shipper_id;
    const updatedShipperData = req.body;

    // Ensure that shipperIdToUpdate is a valid identifier, and updatedShipperData is not empty

    const result = await CommonModel.updateShipper(shipperIdToUpdate, updatedShipperData);

    console.log('Shipper updated successfully:', result);
    res.json(result);
  } catch (error) {
    console.error('Error updating shipper:', error);
    res.status(500).send('Internal Server Error');
  }
};
exports.deleteShipper = async function(req, res) {
  try {
    const shipperIdToDelete = req.params.shipper_id;

    const result = await CommonModel.deleteShipper(shipperIdToDelete);

    console.log('Shipper deleted successfully:', result);
    res.json(result);
  } catch (error) {
    console.error('Error deleting shipper:', error);
    res.status(500).send('Internal Server Error');
  }
}



exports.getStatus = async function(req, res) {
  try {
    const data = await CommonModel.getStatus();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.getPaymentMethod = async function(req, res) {
  try {
    const data = await CommonModel.getPaymentMethod();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


