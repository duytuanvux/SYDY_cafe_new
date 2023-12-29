import React from 'react';
import { List, Card, Rate, message } from 'antd';
import UserServices from "../Services/UserServices";

const PurchasedItems = ({ order, reFetch }) => {
  const userServices = new UserServices();
  function isNull(value) {
    return value === null;
}
  const handleRatingChange = async (itemId, rating) => {
    try {
      const feedbackData = {
        order_id: order.order_id, // Fix: use order.order_id instead of order_id
        user_id: order.user_id,
        item_id : itemId,
        rating,
      };
      // Call the async submitFeedback method from UserServices
      await userServices.submitFeedback(feedbackData);
      reFetch()
      // If the feedback submission is successful, you may want to update the local state or take other actions
      message.success('Feedback submitted successfully!');
    } catch (error) {
      // Handle errors
      message.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="p-4">
      <Card title={`Order ID: #${order.order_id}`} className="w-full">
        <p>
          <strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> ${order.total}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
        <p>
          <strong>Items:</strong>
        </p>
        <List
          dataSource={order.items}
          renderItem={(item) => (
            <List.Item>
              <p>
                <strong>Item ID:</strong> {item.id}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Note:</strong> {item.note}
              </p>
              <p>
                <strong>Rating:</strong> <Rate
                  value={item.rating}
                  disabled={!isNull(item.rating)}
                  onChange={(rating) => handleRatingChange(item.id, rating)}
                />
              </p>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default PurchasedItems;