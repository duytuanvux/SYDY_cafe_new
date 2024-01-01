import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, Descriptions, Button, Space, Rate } from "antd";
import OrderServices from "../../Services/OrderService";

const OrderDetails = ({ order }) => {
  const {
    order_id,
    order_date,
    status,
    shipper,
    total,
    user_id,
    phone,
    address,
    items,
  } = order;
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (rating ? <Rate disabled value={rating}/> : null),
    },
  ];

  useEffect(() => {
    // Transform items data for the table
    const transformedData = items.map((item) => ({
      key: item.id,
      name: item.name,
      quantity: item.quantity,
      note: item.note,
      rating: item.rating,
    }));

    // Update dataSource state with the transformed data
    setDataSource(transformedData);
  }, [items]);
  return (
    <Space direction="vertical">
      <Descriptions
        size="small"
        title={`Order Details - Order ID: ${order_id}`}
      >
        <Descriptions.Item label="Order Date">{order_date}</Descriptions.Item>
        <Descriptions.Item label="Total">{total}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={status.code === 1 ? "blue" : "green"}>{status.name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="User ID">{user_id}</Descriptions.Item>
        <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
        <Descriptions.Item label="Address">{address}</Descriptions.Item>
        <Descriptions.Item label="Shipper">{shipper.name}</Descriptions.Item>
      </Descriptions>

          <Table columns={columns} dataSource={dataSource} pagination={false} />
       
     
    </Space>
  );
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
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status.code === 1 ? "green" : status.code === 2 ? "blue" : "red"
          }
        >
          {status.code === 1
            ? "Paid"
            : status.code === 2
            ? "Processing"
            : "Pending"}
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
      <Modal open={isModalVisible} onCancel={handleModalClose} footer={null} width={700}>
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>
    </div>
  );
};

export default OrderManagement;
