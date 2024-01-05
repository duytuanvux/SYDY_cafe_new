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
  const [selectedStatus, setSelectedStatus] = useState(status.code);
  const [selectedShipper, setSelectedShipper] = useState(shipper.shipper_id);
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

  const updateOrderStatus = async (value) => {
    setSelectedStatus(value);
    await orderServicesInstance.updateStatusOrder(order_id, { status_code: value });
  };

  const updateOrderShipper = async (value) => {
    setSelectedShipper(value);
    await orderServicesInstance.updateShipperOrder(order_id, { shipper_id: value });
  };

  useEffect(() => {
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
          <Select
            value={selectedStatus}
            onChange={updateOrderStatus}
            style={{ width: "150px" }}
            disabled={selectedStatus === 4 || selectedStatus === 0 }
          >
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
          <Select
            value={selectedShipper}
            onChange={updateOrderShipper}
            style={{ width: "150px" }}
            disabled={selectedStatus === 4 || selectedStatus === 0 }
          >
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
      sorter: (a, b) => a.order_id - b.order_id,
      defaultSortOrder: 'desc'
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      align: "center",
      sorter: (a, b) => new Date(a.order_date) - new Date(b.order_date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => renderStatus(status),
      filters: statusList.map((status) => ({ text: status.status_name, value: status.status_code })),
      onFilter: (value, record) => record.status.code === value,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Payment Method ID",
      dataIndex: "payment_method_id",
      key: "payment_method_id",
      align: "center",
      sorter: (a, b) => a.payment_method_id - b.payment_method_id,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
        <button onClick={() => handleOpenModal(record)}>View</button>
        <button onClick={() => handlePrintOrder(record)}>Print Order</button>
      </Space>
      ),
    },
  ];
  const handlePrintOrder = async (order) => {
    window.open(`http://localhost:3000/print/order/${order.order_id}?print=true`)
  };
  
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
      setData(res.data);
    } catch (error) {}
  };
  const getStatus = async () => {
    try {
      const res = await CommonServicesInstance.getStatus();
      setStatusList(res);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };
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
    getAllOrder();
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
        destroyOnClose
        footer={null}
        width={700}
      >
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            listStatus={statusList}
            listShipper={shipperList}
            reFetch={getAllOrder}
          />
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
