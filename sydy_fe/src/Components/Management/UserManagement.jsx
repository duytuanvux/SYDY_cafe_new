import UserServices from "../../Services/UserServices";
import { useState, useEffect } from "react";
import { Table, Space, Button, message } from "antd";

const UserManagement = () => {
  const UserServicesInstance = new UserServices();
  const [data, setData] = useState([]);

  const getAllUser = async () => {
    try {
      const res = await UserServicesInstance.getAllUser();
      setData(res);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const activateUser = async (user_id) => {
    try {
      const res = await UserServicesInstance.activateUser(user_id);
      message.success(res.message);
      getAllUser(); // Refresh the user list after activation
    } catch (error) {
      console.error("Error activating user:", error);
      message.error("Failed to activate user");
    }
  };

  const deactivateUser = async (user_id) => {
    try {
      const res = await UserServicesInstance.deactivateUser(user_id);
      message.success(res.message);
      getAllUser(); // Refresh the user list after deactivation
    } catch (error) {
      console.error("Error deactivating user:", error);
      message.error("Failed to deactivate user");
    }
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <Space size="middle">
          {record.isActive ? (
            <Button onClick={() => deactivateUser(record.user_id)} danger>
              Deactivate
            </Button>
          ) : (
            <Button onClick={() => activateUser(record.user_id)}>
              Activate
            </Button>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.user_id}
    />
  );
};

export default UserManagement;
