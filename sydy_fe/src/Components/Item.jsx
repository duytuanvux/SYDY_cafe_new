import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Reducers/CartReducer";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { InputNumber, Radio, Form, Card, Rate, Typography, Badge } from "antd";

const { Text } = Typography;

function Item({ item }) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Badge.Ribbon style={item.is_visible ? { display: 'none' } : {display: "block"}} color="red" text="Sale">
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
            <strong>Price: ${item.price}</strong>
          </div>
        </Card>
      </Badge.Ribbon>

      <Modal
        open={modalOpen}
        centered
        onCancel={() => setModalOpen(false)}
        destroyOnClose={true}
        footer={null}
        width={650}
      >
        <Form
          name={item.name}
          onFinish={(e) => {
            dispatch(addToCart({ ...item, ...e }));
            setModalOpen(false);
          }}
          initialValues={{
            quantity: 1,
            sugar: "Bình Thường",
            ice: "Bình Thường",
          }}
          style={{ maxWidth: 650 }}
          className="flex flex-col gap-3"
        >
          <div className="flex gap-5">
            <div className="item-img">
              <img src={item.img} alt="" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="item-name font-bold text-xl">{item.name}</div>
              <div className="flex justify-between">
                <div className="item-price text-lg">
                  {item.price}
                  <span>đ</span>
                </div>

                <Form.Item label="Số lượng" name="quantity">
                  <InputNumber
                    min={1}
                    max={50}
                    onChange={(e) => setQuantity(e)}
                  />
                </Form.Item>
              </div>
              <Form.Item label="Ngọt" name="sugar">
                <Radio.Group>
                  <Radio.Button value="Ít">Ít</Radio.Button>
                  <Radio.Button value="Bình Thường">Bình Thường </Radio.Button>
                  <Radio.Button value="Nhiều">Nhiều</Radio.Button>
                  <Radio.Button value="Không">Không</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Đá" name="ice">
                <Radio.Group>
                  <Radio.Button value="Ít">Ít</Radio.Button>
                  <Radio.Button value="Bình Thường">Bình Thường </Radio.Button>
                  <Radio.Button value="Nhiều">Nhiều</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          <button htmlType="submit" className="button w-full">
            Thêm vào giỏ hàng : {item.price * quantity} đ
          </button>
        </Form>
      </Modal>
    </>
  );
}

export default Item;
