import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
  Radio,
} from "antd";

import OrderServices from "../Services/OrderService";
import UserServices from "../Services/UserServices";

import { clearCart } from "../Redux/Reducers/CartReducer";

const { Text } = Typography;
const { Panel } = Collapse;

const Cart = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [order, setOrder] = useState();

  const cart = useSelector((state) => state.cart).cart;
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user_id } = userInfo;
  const total = cart.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const orderServices = new OrderServices();
  const userServiceInstance = new UserServices();
  const { getUserInfo } = userServiceInstance;
  const base = "http://localhost:3000";
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo(user_id);
        form.setFieldsValue(userData.data[0]);
      } catch (error) {
        message.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user_id, form, getUserInfo]);

  const handleSubmit = async (values) => {
    const orderData = {
      items: cart,
      user_id,
      ...values,
      total,
    };
    setOrder(orderData);
  };

  const handleSubmitOrder = async () => {
    try {
      if (!selectedPaymentMethod) {
        message.error(
          "Please select a payment method before placing the order."
        );
        return;
      }

      const payment_method = selectedPaymentMethod;
      const orderData = { ...order, payment_method };
      await orderServices.createOrder(orderData);

      dispatch(clearCart());

      message.success("Order placed successfully!");
    } catch (error) {
      message.error("Error placing the order:", error);
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
  const createOrder = async () => {
    
    return await fetch(`${base}/my-server/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        total,
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id)
  };
  const onApprove = async (data) => {
    try {
      // Order is captured on the server and the response is returned to the browser
      const response = await fetch(`${base}/my-server/capture-paypal-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });
  
      const result = await response.json();
  
      if (result.status === "COMPLETED") {
        // Set the payment method
        setSelectedPaymentMethod((prevMethod) => 2 // New value
        );
        // Now, call handleSubmitOrder
        await handleSubmitOrder();
        console.log(selectedPaymentMethod)
      } else {
        message.error("Error capturing PayPal order:", result.error);
      }
    } catch (error) {
      message.error("Error capturing PayPal order:", error);
    }
  };
  
  
  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 16 }}>
      <Collapse activeKey={["1", "2", "3"]}>
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
                  <Space
                    direction="vertical"
                    size={8}
                    style={{ width: "100%" }}
                  >
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
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </Panel>

        <Panel header="Payment Method" key="3">
          <div>
            <Radio.Group
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              value={selectedPaymentMethod}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Radio value={2}>
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    createOrder={(data,actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </PayPalScriptProvider>
              </Radio>
              <Radio value={1}>COD</Radio>
            </Radio.Group>
          </div>
        </Panel>
      </Collapse>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Button onClick={handleSubmitOrder}>Place Order</Button>
      </div>
    </div>
  );
};
export default Cart;
