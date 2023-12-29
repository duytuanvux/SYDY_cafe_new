import React from "react";
import { Card, Row, Col, Image, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeItem } from "../Redux/Reducers/CartReducer";

function ItemInCart({ item }) {
  const dispatch = useDispatch();

  const handleRemoveItemClick = () => {
    dispatch(removeItem(item));
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
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Sugar: {item.sugar}</p>
          <p>Ice: {item.ice}</p>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemInCart;
