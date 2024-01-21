import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Reducers/CartReducer";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import {
  InputNumber,
  Radio,
  Form,
  Card,
  Rate,
  Typography,
  Badge,
  Row,
  Col,
} from "antd";

const { Text } = Typography;

function Item({ item }) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (values) => {
    const discountAmount = item.discount?.discount_amount || 0;
    const priceToAdd = item.price - (item.price * discountAmount) / 100;
    const subTotal = priceToAdd * quantity;

    dispatch(
      addToCart({
        ...item,
        ...values,
        price: priceToAdd,
        discount: discountAmount,
        subTotal: subTotal,
      })
    );
    setModalOpen(false);
  };
  const renderButtonText = () => {
    if (item.discount?.discount_amount) {
      return `Add to cart - $${
        item.price - (item.price * item.discount?.discount_amount) / 100
      }`;
    } else {
      return `Add to cart - $${item.price}`;
    }
  };
  return (
    <>
      <Badge.Ribbon
        style={
          item.discount?.discount_amount
            ? { display: "block" }
            : { display: "none" }
        }
        color="red"
        text={`${item.discount?.discount_amount}%`}
      >
        <Card
          style={{ width: 200, height: "auto" }}
          cover={
            <img
              alt={item.name}
              src={item.img}
              style={{ height: 150, objectFit: "cover" }}
            />
          }
          actions={[
            <button className="button" onClick={() => setModalOpen(true)}>
              Add to cart
            </button>,
          ]}
        >
          <Card.Meta
            title={item.name}
            description={<Text ellipsis={true}>{item.description}</Text>}
          />
          <div style={{ marginTop: 10 }}>
            {item.avgRating !== null ? (
              <Rate disabled allowHalf defaultValue={item.avgRating} />
            ) : (
              <p style={{ fontStyle: "italic" }}>No rating available</p>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            {item.discount?.discount_amount ? (
              <p>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "grey",
                    marginRight: 5,
                  }}
                >
                  {`$${item.price}`}
                </span>
                <span style={{ color: "red" }}>
                  {`$${
                    item.price -
                    (item.price * item.discount?.discount_amount) / 100
                  } `}
                </span>
              </p>
            ) : (
              <p style={{ color: "black" }}>{`$${item.price}`}</p>
            )}
          </div>
        </Card>
      </Badge.Ribbon>

      <Modal
        open={modalOpen}
        centered
        onCancel={() => setModalOpen(false)}
        destroyOnClose={true}
        footer={null}
        width={600}
      >
        <Form
          name={item.name}
          onFinish={handleAddToCart}
          initialValues={{
            quantity: 1,
            sugar: "normal",
            ice: "normal",
          }}
          style={{ maxWidth: 650 }}
          className="flex flex-col gap-3"
        >
          <Row gutter={16}>
            <Col span={8}>
              <div className="item-img">
                <img src={item.img} alt="" style={{ width: "100%" }} />
              </div>
            </Col>
            <Col span={16}>
              <div className="flex flex-col gap-2">
                <div className="item-name font-bold text-xl">{item.name}</div>
                <div className="flex justify-between">
                  <div className="item-price text-lg">
                    {item.discount?.discount_amount ? (
                      <p>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "grey",
                            marginRight: 5,
                          }}
                        >
                          {`$${item.price}`}
                        </span>
                        <span style={{ color: "red" }}>
                          {`$${
                            item.price -
                            (item.price * item.discount?.discount_amount) / 100
                          } `}
                        </span>
                      </p>
                    ) : (
                      <p style={{ color: "black" }}> {`$${item.price}`}</p>
                    )}
                  </div>

                  <Form.Item label="Quantity" name="quantity">
                    <InputNumber
                      min={1}
                      max={50}
                      onChange={(e) => setQuantity(e)}
                    />
                  </Form.Item>
                </div>
                <Form.Item label="Sugar" name="sugar">
                  <Radio.Group>
                    <Radio value="less">Less</Radio>
                    <Radio value="normal">Normal</Radio>
                    <Radio value="many">Many</Radio>
                    <Radio value="none">None</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Ice" name="ice">
                  <Radio.Group>
                    <Radio value="less">Less</Radio>
                    <Radio value="normal">Normal</Radio>
                    <Radio value="many">Many</Radio>
                    <Radio value="none">None</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Form.Item>
            <button className="button w-full">{renderButtonText()}</button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Item;
