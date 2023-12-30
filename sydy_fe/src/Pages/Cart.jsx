import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  message,
  Result,
  Card,
  Row,
  Col,
  Image,
} from "antd";

import OrderServices from "../Services/OrderService";
import UserServices from "../Services/UserServices";

import { clearCart } from "../Redux/Reducers/CartReducer";

const Cart = () => {
  const cart = useSelector((state) => state.cart).cart;
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const total = cart.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const orderServices = new OrderServices();
  const userServiceInstance = new UserServices(); // Create an instance of UserServices

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userServiceInstance.getUserInfo(
          userInfo.user_id
        );
        form.setFieldsValue(userData.data[0]);
      } catch (error) {
        message.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userInfo, form, userServiceInstance]);

  const handleSubmit = async (values) => {
    try {
      const orderData = {
        items: cart,
        user_id: userInfo.user_id,
        fullname: values.fullname,
        phone: values.phone,
        address: values.address,
        total,
      };

      const orderResponse = await orderServices.createOrder(orderData);
      console.log("Order created successfully:", orderResponse);
      dispatch(clearCart());
      message.success("Order created successfully");
    } catch (error) {
      message.error("Error creating order. Please try again.");
    }
  };
  if (cart.length === 0) {
    return (
      <Result
        status="info"
        title="Your cart is empty"
        subTitle="Please add items to your cart before proceeding to checkout."
      />
    );
  }
  return (
    <div>
      {cart.map((item) => (
        <Card title={item.name} style={{ width: 300 }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Image src={item.img} alt={item.name} preview={false} />
            </Col>
            <Col span={24}>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Sugar: {item.sugar}</p>
              <p>Ice: {item.ice}</p>
              <p>Average Rating: {item.avgRating}</p>
            </Col>
          </Row>
        </Card>
      ))}
      <div>Total: {total}</div>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit Order</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Cart;
