import { Tabs, Badge } from "antd";

import ItemManagement from "../Components/Management/ItemManagement";
import OrderManagement from "../Components/Management/OrderManagement";
import ShipperManagement from "../Components/Management/ShipperManagement";
import UserManagement from "../Components/Management/UserManagement";
import OrderServices from "../Services/OrderService";
import { useEffect, useState } from "react";
const Management = () => {
  const [order_count, setOrderCount] = useState()
  const OrderServicesInstance = new OrderServices()
  const getOrderNeedAction = async () => {
    try {
      const res = await OrderServicesInstance.orderNeedAction() 
      setOrderCount(res.data[0].order_count)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getOrderNeedAction()
  })
  const tab = [
    {
      key: "order",
      label: "Quản lý đơn hàng",
      icon: <Badge count={order_count} color="red" />,
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
