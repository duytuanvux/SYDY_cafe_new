import React, { useEffect, useState } from "react";
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
  Radio,
} from "antd";

import OrderServices from "../Services/OrderService";
import UserServices from "../Services/UserServices";
import CommonServices from "../Services/CommonServices";

import { clearCart } from "../Redux/Reducers/CartReducer";

const { Text } = Typography;
const { Panel } = Collapse;

const Cart = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [order, setOrder] = useState();
  const [paymentMethods, setPaymentMethods] = useState([]);

  const cart = useSelector((state) => state.cart).cart;
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user_id } = userInfo;
  const total = cart.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0);

  const orderServices = new OrderServices();
  const userServiceInstance = new UserServices();
  const commonServices = new CommonServices();
  const { getUserInfo } = userServiceInstance;
  const { getPaymentMethod } = commonServices;

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

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await getPaymentMethod();
        setPaymentMethods(response);
      } catch (error) {
        message.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, [getPaymentMethod]);

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
        message.error("Please select a payment method before placing the order.");
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
            >
              {paymentMethods.map((method) => (
                <Radio
                  key={method.payment_method_id}
                  value={method.payment_method_id}
                >
                  {method.method_name}
                </Radio>
              ))}
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
