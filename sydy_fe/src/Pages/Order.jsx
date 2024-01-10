import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Empty, Tabs } from "antd";
import PurchasedItems from "../Components/PurchasedItems ";
import UserServices from "../Services/UserServices";

const { TabPane } = Tabs;


function Order() {
  const userInfo = useSelector((state) => state.auth.user);
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const userServices = new UserServices();

  const fetchPurchasedOrders = async () => {
    try {
      const { user_id } = userInfo;
      const orders = await userServices.getPurchasedOrder(user_id);
      setPurchasedOrders(orders.orders);
    } catch (error) {
      console.error("Error fetching purchased orders:", error);
    }
  };

  useEffect(() => {
    fetchPurchasedOrders();
  }, []);

  const handleRefetch = () => {
    fetchPurchasedOrders();
  };


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Purchased Orders</h1>

      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane tab="Processing Orders" key="1">
          {purchasedOrders
            .filter((order) => [1, 2, 3].includes(order.status.code))
            .map((order) => (
              <PurchasedItems key={order.order_id} order={order} reFetch={handleRefetch} />
            ))}
          {purchasedOrders.filter((order) => [1, 2, 3].includes(order.status.code)).length === 0 && (
            <Empty description="No processing orders yet" />
          )}
        </TabPane>
        <TabPane tab="Completed Orders" key="2">
          {purchasedOrders
            .filter((order) => order.status.code === 4)
            .map((order) => (
              <PurchasedItems key={order.order_id} order={order} reFetch={handleRefetch} />
            ))}
          {purchasedOrders.filter((order) => order.status.code === 4).length === 0 && (
            <Empty description="No completed orders yet" />
          )}
        </TabPane>
        <TabPane tab="Canceled Orders" key="3">
          {purchasedOrders
            .filter((order) => order.status.code === 0)
            .map((order) => (
              <PurchasedItems key={order.order_id} order={order} reFetch={handleRefetch} />
            ))}
          {purchasedOrders.filter((order) => order.status.code === 0).length === 0 && (
            <Empty description="No canceled orders yet" />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Order;
