import React, { useEffect, useState } from "react";
import { Table, Tag, Modal } from "antd";
import Descriptions from "antd/lib/descriptions";
import OrderServices from "../../Services/OrderService";

const OrderDetails = ({ order }) => { 
  function renderDataAsItems(data) {
    const items = [];
    for (const key in data) {
      let label = key.charAt(0).toUpperCase() + key.slice(1);
      let children = data[key];
  
      if (key === 'order_date' || key === 'created_at') {
        // Format date values
        children = new Date(children).toLocaleString();
      }
  
      items.push({
        key: key,
        label: label,
        children: children,
      });
    }
    return items;
  }
  return (
    <Descriptions bordered layout="vertical" items={renderDataAsItems(order)} />
  )
};


const OrderManagement = () => {
  const OrderServicesInstance = new OrderServices();
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <button onClick={() => handleOpenModal(record)}>View Details</button>
      ),
    },
  ];
  const getAllOrder = async () => {
    try {
      const res = await OrderServicesInstance.getAllOrder();
      const sortedData = res.data.sort(
        (a, b) => new Date(b.order_date) - new Date(a.order_date)
      );
      setData(sortedData);
    } catch (error) {}
  };
  useEffect(() => {
    getAllOrder();
  }, []);
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.order_id}
        sticky
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for displaying order details */}
      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>
    </div>
  );
};

export default OrderManagement;
