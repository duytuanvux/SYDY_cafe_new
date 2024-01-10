import React from "react";
import { Card, Row, Col, Image, Button } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../Redux/Reducers/CartReducer";

function ItemInCart({ item }) {
  const dispatch = useDispatch();

  const handleRemoveItemClick = () => {
    dispatch(removeItem(item));
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ ...item, quantity: newQuantity }));
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ ...item, quantity: newQuantity }));
    }
  };

  return (
    <Card
      title={item.name}
      style={{ width: 400, margin: "16px" }}
      extra={
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={handleRemoveItemClick}
        >
          Remove
        </Button>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Image src={item.img} alt={item.name} preview={false} />
        </Col>
        <Col span={16}>
          <p>Price: {`${item.price} VND`}</p>
          <p>
            Quantity:{" "}
            <Button
              size="small"
              icon={<MinusOutlined />}
              onClick={handleDecreaseQuantity}
              style={{ marginRight: "8px" }}
            />
            {item.quantity}
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={handleIncreaseQuantity}
              style={{ marginLeft: "8px" }}
            />
          </p>
          <p>Sugar: {item.sugar}</p>
          <p>Ice: {item.ice}</p>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemInCart;
