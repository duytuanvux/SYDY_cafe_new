import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Reducers/AuthReducer";
import { clearCart } from "../Redux/Reducers/CartReducer";

const DropdownComponent = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenuClick = (e) => {
    // Add logic based on the selected menu item
    switch (e.key) {
      case "detailAccount":
        navigate("/userInfo");
        break;
      case "order":
        navigate("/order");
        break;
      case "management":
        navigate("/management");
        break;
      case "logout":
        dispatch(logout());
        dispatch(clearCart());
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {user.is_admin ? (
        <>
          <Menu.Item key="management">Quản lý</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="detailAccount">Thông tin cá nhân</Menu.Item>
          <Menu.Item key="order">Đơn hàng của bạn</Menu.Item>
        </>
      )}
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button style={{ color: "white" }}>
        {`Welcome, ${user.fullname}`}
      </Button>
    </Dropdown>
  );
};

export default DropdownComponent;
