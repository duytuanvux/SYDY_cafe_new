import React, { useEffect, useState } from "react";
import { Table } from "antd";
import CommonServices from "../Services/CommonServices";

const ShipperManagement = () => {
  const CommonServicesInstance = new CommonServices();
  const [data, setData] = useState([]);
  const getShipper = async () => {
    try {
      const res = await CommonServicesInstance.getShipper();
      setData(res);
    } catch (error) {
        
    }
  };
  const columns = [
    {
      title: "Shipper ID",
      dataIndex: "shipper_id",
      key: "shipper_id",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  useEffect(() => {
    getShipper();
  }, []);
  return <Table dataSource={data} columns={columns} rowKey={(record) => record.shipper_id} />;
};

export default ShipperManagement;
