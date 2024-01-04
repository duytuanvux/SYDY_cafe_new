import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Descriptions,
  Button,
  Space,
  Rate,
  Select,
} from "antd";
import OrderServices from "../../Services/OrderService";
import CommonServices from "../../Services/CommonServices";

const { Option } = Select;
const statusColors = {
  0: "gray", // Cancelled
  1: "blue", // Pending
  2: "orange", // Processing
  3: "green", // Delivering
  4: "purple", // Completed
  // Add more status codes as needed
};
const OrderDetails = ({ order, listStatus, listShipper }) => {
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
      render: (rating) => (rating ? <Rate disabled value={rating} /> : null),
    },
  ];
  const orderServicesInstance = new OrderServices();
  const handleStatusChange = async (value) => {
    try {
      const data = { status_code: value };
      
      const res = await orderServicesInstance.updateStatusOrder(order_id, data);
    } catch (error) {}
  };

  const handleShipperChange = async (value) => {
    try {
      const data = { shipper_id : value };
      
      const res = await orderServicesInstance.updateShipperOrder(order_id, data);
    } catch (error) {}
  };

  useEffect(() => {
    // Transform items data for the table
    const transformedData = items.map((item) => ({
      key: item.id,
      name: item.name,
      quantity: item.quantity,
      note: item.note,
      rating: item.rating,
    }));

    
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
          <Select value={status.code} onChange={handleStatusChange}>
            {listStatus.map((statusOption) => (
              <Option
                key={statusOption.status_code}
                value={statusOption.status_code}
              >
                {statusOption.status_name}
              </Option>
            ))}
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label="User ID">{user_id}</Descriptions.Item>
        <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
        <Descriptions.Item label="Address">{address}</Descriptions.Item>
        <Descriptions.Item label="Shipper">
          <Select value={shipper.shipper_id} onChange={handleShipperChange}>
          {listShipper.map((shipperOption) => (
              <Option
                key={shipperOption.shipper_id}
                value={shipperOption.shipper_id}
              >
                {shipperOption.fullname}
              </Option>
            ))}
          </Select>
        </Descriptions.Item>
      </Descriptions>

      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </Space>
  );
};

const OrderManagement = () => {
  const OrderServicesInstance = new OrderServices();
  const CommonServicesInstance = new CommonServices();
  const [data, setData] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [shipperList, setShipperList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      align: "center",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => renderStatus(status),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
    },
    {
      title: "Payment Method ID",
      dataIndex: "payment_method_id",
      key: "payment_method_id",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <button onClick={() => handleOpenModal(record)}>View Details</button>
      ),
    },
  ];
  const renderStatus = (status) => {
    const { code, name } = status;
    const color = statusColors[code];
    if (status) {
      return <Tag color={color}>{name}</Tag>;
    } else {
      // Default fallback if status code is not recognized
      return <Tag>Unknown</Tag>;
    }
  };

  const getAllOrder = async () => {
    try {
      const res = await OrderServicesInstance.getAllOrder();
      const sortedData = res.data.sort(
        (a, b) => new Date(b.order_date) - new Date(a.order_date)
      );
      setData(sortedData);
    } catch (error) {}
  };
  const getStatus = async () => {
    try {
      const res = await CommonServicesInstance.getStatus();
      setStatusList(res);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  }
  const getShipper = async () => {
    try {
      const res = await CommonServicesInstance.getShipper();
      setShipperList(res);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };
  useEffect(() => {
    getAllOrder();
    getStatus();
    getShipper();
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
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={700}
      >
        {selectedOrder && (
          <OrderDetails order={selectedOrder} listStatus={statusList} listShipper={shipperList} />
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
