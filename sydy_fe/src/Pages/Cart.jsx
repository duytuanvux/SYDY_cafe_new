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
  Space,
  Typography,
  Collapse,
} from "antd";

import OrderServices from "../Services/OrderService";
import UserServices from "../Services/UserServices";

import { clearCart } from "../Redux/Reducers/CartReducer";

const { Text } = Typography;
const { Panel } = Collapse;

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
  const userServiceInstance = new UserServices();

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
    <div style={{ maxWidth: 800, margin: "auto",padding: 16 }}>
      <Collapse defaultActiveKey={["1", "2", "3"]}>
        {/* Segment 1: Items */}
        <Panel header="Items in cart" key="1">
          {cart.map((item) => (
            <Card key={item.id} style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col span={16}>
                  <Space direction="vertical" size={8} style={{ width: "100%" }}>
                    <Text strong>{item.name}</Text>
                    <Text>{`Sugar: ${item.sugar}, Ice: ${item.ice}`}</Text>
                    <Text type="danger">{`${item.price} VND`}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>SubTotal: {`${item.subTotal} VND`}</Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          ))}
          <div>Total: {total} VND</div>
        </Panel>

        {/* Segment 2: User Info Form */}
        <Panel header="Delivery Information" key="2">
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
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
              rules={[
                { required: true, message: "Please enter your address" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Order
              </Button>
            </Form.Item>
          </Form>
        </Panel>

        {/* Segment 3: Payment Method (Add your payment method UI here) */}
        <Panel header="Payment Method" key="3">
          {/* Add your payment method UI components here */}
          <p>Payment method options go here...</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Cart;
