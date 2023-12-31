import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import OrderServices from "../Services/OrderService";

const OrderManagement = () => {
  const OrderServicesInstance = new OrderServices();
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: "Status",
      dataIndex: "status_code",
      key: "status_code",
      render: (status) => (
        <Tag color={status === 1 ? "green" : status === 2 ? "blue" : "red"}>
          {status === 1 ? "Paid" : status === 2 ? "Processing" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Payment Method ID",
      dataIndex: "payment_method_id",
      key: "payment_method_id",
    },
    // Add more columns as needed
  ];
  const getAllOrder = async () => {
    try {
      const res = await OrderServicesInstance.getAllOrder();
      setData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllOrder();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.order_id}
      sticky
      pagination={{ pageSize: 10 }} // Set the number of rows per page
    />
  );
};

export default OrderManagement;
