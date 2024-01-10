import React from "react";
import {
  Card,
  message,
  Table,
  Typography,
  Rate,
  Descriptions,
  Badge,
} from "antd";
import UserServices from "../Services/UserServices";
const { Title } = Typography;
const statusList = {
  0: "default", // Cancelled
  1: "warning", // Pending
  2: "error", // Processing
  3: "processing", // Delivering
  4: "success", // Completed
  // Add more status codes as needed
};
const PurchasedItems = ({ order, reFetch }) => {
  const userServices = new UserServices();
  const renderStatus = (status) => {
    const { code, name } = status;
    const color = statusList[code];
    if (status) {
      return <Badge status={color} text={name} />;
    } else {
      // Default fallback if status code is not recognized
      return <Badge>Unknown</Badge>;
    }
  };
  const handleRatingChange = async (itemId, rating) => {
    try {
      // Check if the order status is 4 (assuming 4 is the status code for a completed order)
      if (order.status.code !== 4) {
        // If the order status is not 4, do not allow rating
        message.warning("You can only rate items for completed orders.");
        return;
      }
      const feedbackData = {
        order_id: order.order_id,
        user_id: order.user_id,
        item_id: itemId,
        rating,
      };
      // Call the async submitFeedback method from UserServices
      await userServices.submitFeedback(feedbackData);
      reFetch();
      // If the feedback submission is successful, you may want to update the local state or take other actions
      message.success("Feedback submitted successfully!");
    } catch (error) {
      // Handle errors
      message.error("Error submitting feedback:", error);
    }
  };

  const columns = [
    { title: "Item Name", dataIndex: "name", key: "name", align: "center" },
    { title: "Note", dataIndex: "note", key: "note", align: "center" },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    { title: "Price", dataIndex: "price", key: "price", align: "center" },
    {
      title: "SubTotal",
      dataIndex: "sub_total",
      key: "sub_total",
      align: "center",
    },
    // Conditionally render the Rating column based on the order status
    order.status.code === 4
      ? {
          title: "Rating",
          dataIndex: "rating",
          key: "rating",
          align: "center",
          render: (rating, record) => (
            <Rate
              value={rating}
              onChange={(value) => handleRatingChange(record.key, value)}
            />
          ),
        }
      : null,
  ].filter(Boolean);

  const data = order.items.map((item) => ({
    key: item.id,
    name: item.name,
    note: item.note,
    quantity: item.quantity,
    price: item.price,
    sub_total: item.sub_total,
    rating: item.rating,
  }));

  return (
    <Card>
      <Title level={4}>{`Order ID: #${order.order_id}`}</Title>

      {/* Descriptions for Order Details */}
      <Descriptions title="Order Information">
        <Descriptions.Item label="Order Date">
          {order.order_date}
        </Descriptions.Item>
        <Descriptions.Item label="Shipper">
          {order.shipper.name || "Not assgined"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {renderStatus(order.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">{order.phone}</Descriptions.Item>
        <Descriptions.Item label="Address">{order.address}</Descriptions.Item>
        <Descriptions.Item label="Payment Method">
          {order.payment_method.name || "Not specified"}
        </Descriptions.Item>
      </Descriptions>

      {/* Items Table */}
      <Title level={5}>Items</Title>
      <Table dataSource={data} columns={columns} pagination={false} />

      {/* Total Amount */}
      <p style={{ textAlign: "right" }}>Total Amount: {order.total}</p>
    </Card>
  );
};

export default PurchasedItems;
