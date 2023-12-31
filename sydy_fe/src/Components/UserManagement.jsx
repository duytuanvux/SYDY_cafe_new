import UserServices from "../Services/UserServices";
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
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
