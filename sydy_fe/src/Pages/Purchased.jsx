import { useEffect, useState } from "react";
import PurchasedItems from "../Components/PurchasedItems ";
import UserServices from "../Services/UserServices";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../Redux/Reducers/UserReducer";

function Purchased() {
    const userInfo = useSelector(selectUserInfo);
  // State to store the purchased orders
  const [purchasedOrders, setPurchasedOrders] = useState([]);

  // Create an instance of UserServices
  const userServices = new UserServices();

  const fetchPurchasedOrders = async () => {
    try {
      const data = userInfo.user_id ;
      const orders = await userServices.getPurchasedOrder(data);
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
  console.log(purchasedOrders)
  return (
    <div className="p-4">
    <h1 className="text-3xl font-bold mb-4">Purchased Orders</h1>
    {purchasedOrders.length > 0 ? (
      purchasedOrders.map(order => (
        <PurchasedItems key={order.order_id} order={order} reFetch={handleRefetch} />
      ))
    ) : (
      <p>Đang tải dữ liệu</p>
    )}
  </div>
  );
}

export default Purchased;
