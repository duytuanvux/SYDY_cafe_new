var express = require("express");
var router = express.Router();

var Order = require("../models/order.model")


router.get('/order/:order_id', async (req, res) => {
    const order_id = req.params.order_id;
    const orderDetails = await Order.getOrderByOrderId(order_id)
    console.log(orderDetails)
    if (req.query.print) {
      const generatePDF = require('../controllers/PDFGenerator');
      const pdfDoc = await generatePDF(orderDetails);
  
      // Pipe the PDF to the response
      res.setHeader('Content-Type', 'application/pdf');
      pdfDoc.pipe(res);
      pdfDoc.end();
    } else {
      res.json(orderDetails);
    }
  });

  module.exports = router;
  