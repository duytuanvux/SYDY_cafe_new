import {
  Tabs,
  Badge
} from "antd";

import ItemManagement from "../Components/ItemManagement";
import OrderManagement from "../Components/OrderManagement";
import ShipperManagement from "../Components/ShipperManagement";
import UserManagement from "../Components/UserManagement";
const Management = () => {

  const tab = [
    {
      key: "order",
      label: "Quản lý đơn hàng",
      icon : <Badge count={0} color='red' /> ,
      children: <OrderManagement/>,
    },
    {
      key: "item",
      label: "Quản lý sản phẩm",
      children: <ItemManagement/>,
    },
    {
      key: "user",
      label: "Quản lý người dùng",
      children: <UserManagement/>,
    },
    {
      key: "shipper",
      label: "Quản lý người giao hàng",
      children: <ShipperManagement/>,
    },
  ];

  return (
    <>
      <div className="text-center uppercase m-5 text-4xl">Quản lý</div>
      <Tabs
        centered
        items={tab}
        
      ></Tabs>
    </>
  );
};

export default Management;
