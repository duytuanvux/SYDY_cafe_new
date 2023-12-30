import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import PurchasedItems from "../Components/PurchasedItems ";
import UserServices from "../Services/UserServices";


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

  const renderOrders = (filterCode) =>
    purchasedOrders
      .filter((order) => (filterCode ? order.status.code === filterCode : true))
      .map((order) => (
        <PurchasedItems
          key={order.order_id}
          order={order}
          reFetch={handleRefetch}
        />
      ));

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Purchased Orders</h1>

      {purchasedOrders.length > 0 ? (
        <>
          <h2 className="text-xl font-bold mb-2">Processing Orders</h2>
          {renderOrders(4)}

          <h2 className="text-xl font-bold mb-2">Completed Orders</h2>
          {renderOrders()}
        </>
      ) : (
        <Empty description="No purchased orders yet" />
      )}
    </div>
  );
}

export default Order;
