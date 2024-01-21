const PDFDocument = require("pdfkit-table");

async function generatePDF(orderDetails) {
  const doc = new PDFDocument({ margin: 20, size: "A6" });
  // Set up font
  doc.font("Helvetica-Bold");
  doc.fontSize(12);

  // Header
  doc.text("SYDY Cafe & More", { align: "center" });
  doc.font("Helvetica");
  doc.fontSize(10);
  doc.text("Van Phuc City, Thu Duc, HCMC", { align: "center" });
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.text(`Order Details`, { align: "center" });
  doc.fontSize(10);
  doc.text(`ID: ${orderDetails[0].order_id || "N/A"}`, { align: "center" });
  doc.font("Helvetica");
  doc.moveDown();

  doc.lineGap(5);
  doc.text(`Order Date: ${orderDetails[0].order_date || "N/A"}`);
  doc.lineGap(5);
  doc.text(`User ID: ${orderDetails[0].user_id || "N/A"}`);
  doc.lineGap(5);
  doc.text(`Phone: ${orderDetails[0].phone || "N/A"}`);
  doc.lineGap(5);
  doc.text(`Address: ${orderDetails[0].address || "N/A"}`);

  doc.moveDown();

  // Example table layout
  const table = {
    headers: ["Item", "Note", "Price", "Quantity", "SubTotal"],
    rows: orderDetails[0].items.map((item) => [
      item.name || "N/A",
      item.note || "N/A",
      item.price || "N/A",
      item.quantity || "N/A",
      item.sub_total || "N/A",
    ]),
  };
  await doc.table(table, { columnsSize: [80, 60, 30, 40, 40] });
  doc.moveDown();

  const paymentTable = {
    headers: [
      {
        label: "Summary",
        align: "left",
        headerAlign: "left",
        headerOpacity: 0,
      },
      {
        label: "",
        align: "right",
        headerAlign: "right",
        headerOpacity: 0,
      },
    ],
    rows: [
      ["Total Amount", orderDetails[0].total || "N/A"],
      ["Paid", orderDetails[0].isPaid ? orderDetails[0].total : 0],
      [
        "Collect",
        orderDetails[0].total -
          (orderDetails[0].isPaid ? orderDetails[0].total : 0) || "N/A",
      ],
    ],
  };

  await doc.table(paymentTable, { columnsSize: [125, 125] });

  return doc;
}

module.exports = generatePDF;
