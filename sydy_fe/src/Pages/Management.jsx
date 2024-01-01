import { Tabs, Badge } from "antd";

import ItemManagement from "../Components/Management/ItemManagement";
import OrderManagement from "../Components/Management/OrderManagement";
import ShipperManagement from "../Components/Management/ShipperManagement";
import UserManagement from "../Components/Management/UserManagement";
const Management = () => {
  const tab = [
    {
      key: "order",
      label: "Quản lý đơn hàng",
      icon: <Badge count={1} color="red" />,
      children: <OrderManagement />,
    },
    {
      key: "item",
      label: "Quản lý sản phẩm",
      children: <ItemManagement />,
    },
    {
      key: "user",
      label: "Quản lý người dùng",
      children: <UserManagement />,
    },
    {
      key: "shipper",
      label: "Quản lý người giao hàng",
      children: <ShipperManagement />,
    },
  ];

  return (
    <>
      <div className="text-center uppercase m-5 text-4xl">Quản lý</div>
      <Tabs centered items={tab}></Tabs>
    </>
  );
};

export default Management;
