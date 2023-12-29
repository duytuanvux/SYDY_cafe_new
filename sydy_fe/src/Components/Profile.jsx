import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { selectUserInfo,logout } from '../Redux/Reducers/UserReducer';
import { clearCart } from '../Redux/Reducers/CartReducer';


const DropdownComponent = () => {
  
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenuClick = (e) => {
    // Add logic based on the selected menu item
    switch (e.key) {
      case 'detailAccount':
        navigate('/userInfo')
        break;
      case 'purchasedOrder':
        navigate('/purchased')
        break;
      case 'logout':
        dispatch(logout());
        dispatch(clearCart())
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="detailAccount">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="purchasedOrder">Đơn hàng đã mua</Menu.Item>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button style={{color: 'white'}}>
        {`Welcome, ${userInfo.fullname}`}
      </Button>
    </Dropdown>
  );
};

export default DropdownComponent;
