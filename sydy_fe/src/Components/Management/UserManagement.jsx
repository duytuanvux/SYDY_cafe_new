import UserServices from "../../Services/UserServices";
import { useState,useEffect } from "react";
import { Table } from "antd";
const UserManagement = () => {
  const UserServicesInstance = new UserServices();
  const [data, setData] = useState([]);
  const getAllUser = async () => {
    try {
      const res = await UserServicesInstance.getAllUser();
      setData(res);
    } catch (error) {}
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
  ];

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <Table dataSource={data} columns={columns} rowKey={(record) => record.user_id} />
  );
};

export default UserManagement;
