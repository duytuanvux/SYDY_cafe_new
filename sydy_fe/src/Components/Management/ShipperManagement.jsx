import React, { useEffect, useState } from "react";
import { Table } from "antd";
import CommonServices from "../../Services/CommonServices";

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
      align: "center",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
    },
  ];

  useEffect(() => {
    getShipper();
  }, []);
  return <Table dataSource={data} columns={columns} rowKey={(record) => record.shipper_id} />;
};

export default ShipperManagement;
