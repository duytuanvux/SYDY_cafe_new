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
          <Menu.Item key="management">Management</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="detailAccount">Profile Information</Menu.Item>
          <Menu.Item key="order">Purchased Orders</Menu.Item>
        </>
      )}
      <Menu.Item key="logout">Log Out</Menu.Item>
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
