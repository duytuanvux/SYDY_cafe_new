import React from "react";
import {
  Card,
  message,
  Table,
  Typography,
  Rate,
  Descriptions,
  Badge,
  Button,
  Spin
} from "antd";
import { useState } from "react";
import UserServices from "../Services/UserServices";
import OrderServices from "../Services/OrderService";
import ConfirmationDialog from "./ConfirmationDialog";
const statusList = {
  0: "default", // Cancelled
  1: "warning", // Pending
  2: "error", // Processing
  3: "processing", // Delivering
  4: "success", // Completed
  // Add more status codes as needed
};
const PurchasedItems = ({ order, reFetch }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const userServices = new UserServices();
  const orderServices = new OrderServices();

  const renderStatus = (status) => {
    const { code, name } = status || {};
    const color = statusList[code] || "default";
    return <Badge status={color} text={name || "Unknown"} />;
  };
  function isNull(value) {
    return value === null;
  }
  const handleShowConfirm = () => setConfirmVisible(true);

  const handleRatingChange = async (itemId, rating) => {
    try {
      if (order.status.code !== 4) {
        message.warning("You can only rate items for completed orders.");
        return;
      }
      const feedbackData = {
        order_id: order.order_id,
        user_id: order.user_id,
        item_id: itemId,
        rating,
      };
      await userServices.submitFeedback(feedbackData);
      reFetch();
      message.success("Feedback submitted successfully!");
    } catch (error) {
      message.error("Error submitting feedback:", error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const data = await orderServices.cancelOrder(order.order_id);
      message.success(data.message);
      setConfirmVisible(false);
      reFetch(); // Fetch the order again after cancellation
    } catch (error) {
      message.error("Error cancelling order:", error);
    } finally {
    }
  };

  const handleCancel = () => setConfirmVisible(false);

  const columns = [
    { title: "Item Name", dataIndex: "name", key: "name", align: "center" },
    { title: "Note", dataIndex: "note", key: "note", align: "center" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", align: "center" },
    { title: "Price", dataIndex: "price", key: "price", align: "center" },
    { title: "SubTotal", dataIndex: "sub_total", key: "sub_total", align: "center" },
    order.status.code === 4 && {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      render: (rating, record) => (
        <Rate
          value={rating}
          disabled={!isNull(record.rating)}
          onChange={(value) => handleRatingChange(record.key, value)}
        />
      ),
    },
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
    <>
      <Card>
        <Typography.Title
          level={4}
        >{`Order ID: #${order.order_id}`}</Typography.Title>

        {/* Descriptions for Order Details */}
        <Descriptions title="Order Information">
          <Descriptions.Item label="Order Date">
            {order.order_date}
          </Descriptions.Item>
          <Descriptions.Item label="Shipper">
            {order.shipper.name || "Not assigned"}
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
        <Typography.Title level={5}>Items</Typography.Title>
        <Table dataSource={data} columns={columns} pagination={false} />

        {/* Total Amount */}
        <Typography.Title
          style={{ margin: "10px" }}
          level={4}
        >{`Total: $${order.total}`}</Typography.Title>

        {/* Cancel Order Button */}
        {order.status.code === 1 && (
          <Button style={{ float: "right" }} danger onClick={handleShowConfirm}>
            Cancel Order
          </Button>
        )}
      </Card>
      {confirmVisible && (
        <ConfirmationDialog onConfirm={handleCancelOrder} onCancel={handleCancel} />
      )}
    </>
  );
};

export default PurchasedItems;
