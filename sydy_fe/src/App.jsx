import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ItemInCart from "./Components/ItemInCart";
import { Drawer, FloatButton, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PhoneOutlined,
  ShoppingCartOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";


function App() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart).cart;

  const totalQty = cart.reduce((sum, item) => {
    return sum + item?.quantity;
  }, 0);
  const total = cart.reduce((sum, item) => {
    return sum + item?.price * item?.quantity;
  }, 0);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-white">
      <Header />
      <Outlet />
      <Footer />
      <FloatButton.Group>
        <FloatButton
          href="tel:+8496162028"
          tooltip={<>Hotline</>}
          icon={<PhoneOutlined />}
        />

        <FloatButton
          onClick={showDrawer}
          badge={{ count: totalQty, overflowCount: 50 }}
          icon={<ShoppingCartOutlined />}
          tooltip={<div>Cart</div>}
        />
        <FloatButton.BackTop
          tooltip={<>Reach Top</>}
          icon={<VerticalAlignTopOutlined />}
          visibilityHeight={0}
        />
      </FloatButton.Group>
      <Drawer
        width={500}
        title={`Giỏ hàng của bạn (${totalQty} món)`}
        placement="right"
        onClose={onClose}
        open={open}
      >
        {cart.length === 0 ? (
          <Result
            status="info"
            title="Your cart is empty"
            subTitle="Please add items to your cart before proceeding to checkout."
          />
        ) : (
          <>
            <div style={{ height: "90%", overflowY: "auto" }}>
              <div className="flex flex-col">
                {cart.map((item) => (
                  <ItemInCart
                    item={item}
                    key={item.id + item.sugar + item.ice}
                  />
                ))}
              </div>
            </div>
            <div style={{ height: "10%", marginTop: "auto" }}>
              <button
                className="button flex items-center justify-between"
                onClick={() => {
                  setOpen(false);
                  navigate("/cart");
                }}
              >
                <span>Tiến hành đặt hàng:</span>
                <span>{`${total}đ`}</span>
              </button>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
}
export default App;
