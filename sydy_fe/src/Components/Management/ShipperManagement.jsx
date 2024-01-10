import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import CommonServices from "../../Services/CommonServices";

const ShipperManagement = () => {
  const commonServicesInstance = new CommonServices();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editRecord, setEditRecord] = useState(null);

  const getShipper = async () => {
    try {
      const res = await commonServicesInstance.getShipper();
      setData(res);
    } catch (error) {
      console.error("Error fetching shipper data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getShipper();
    };

    fetchData();
  }, []);

  const modalTitle = editRecord ? "Edit Shipper" : "Add Shipper";

  const buttonStyle = { margin: "8px" };

  const showAddEditModal = (record) => {
    setEditRecord(record);
    setModalVisible(true);
    if (record) {
      form.setFieldsValue({
        fullname: record.fullname,
        phone: record.phone,
      });
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    const formValues = form.getFieldsValue();
    try {
      if (editRecord) {
        await commonServicesInstance.updateShipper(
          editRecord.shipper_id,
          formValues
        );
        message.success("Shipper updated successfully!");
      } else {
        await commonServicesInstance.addShipper(formValues);
        message.success("Shipper added successfully!");
      }
      setModalVisible(false);
      getShipper();
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDelete = async (record) => {
    try {
      await commonServicesInstance.hideShipper(record.shipper_id);
      message.success("Shipper deleted successfully!");
      getShipper();
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    }
  };
  const columns = [
    {
      title: "Shipper ID",
      dataIndex: "shipper_id",
      align: "center",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <>
          <Button
            style={buttonStyle}
            type="default"
            onClick={() => showAddEditModal(record)}
          >
            Edit
          </Button>
          <Button
            style={buttonStyle}
            danger
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Button onClick={() => showAddEditModal(null)}>Add Shipper</Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.shipper_id}
      />

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ type: "default" }}
      >
        <Form form={form} layout="vertical" name="shipper_form">
          <Form.Item
            name="fullname"
            label="Fullname"
            rules={[
              { required: true, message: "Please enter Fullname" },
              { max: 255, message: "Fullname must be at most 255 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter Phone" },
              { pattern: /^\d{10}$/, message: "Phone must be 10 digits" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ShipperManagement;
