import {
  Button,
  Form,
  Image,
  Input,
  Switch,
  Modal,
  Table,
  Space,
  message,
  Select,
  DatePicker,
} from "antd";

import { useEffect, useState } from "react";
import ItemServices from "../Services/ItemServices";
import { CommonServices } from "../Services/CommonServices";
import dayjs from "dayjs";



const Management = () => {
  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [dataSource, setDataSource] = useState([]);
  const [categories, setCategories] = useState([]);

  const itemServicesInstance = new ItemServices();
  const commonServicesInstance = new CommonServices();

  async function getAllItem() {
    try {
      const items = await itemServicesInstance.getAllItem();
      setDataSource(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function getCategory() {
    try {
      const res = await commonServicesInstance.getCategory();
      setCategories(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function handleItemAction(actionType, itemId, item) {
    try {
      let res;

      switch (actionType) {
        case "remove":
          res = await itemServicesInstance.deleteItem(itemId);
          break;
        case "edit":
          res = await itemServicesInstance.editItem(itemId, item);
          break;
        case "add":
          res = await itemServicesInstance.addItem(item);
          break;
        default:
          break;
      }

      getAllItem();
      message.success(res.message || "Item operation successful");
    } catch (error) {
      message.error(error.response?.data?.error || "Error");
    }
  }

  useEffect(() => {
    getAllItem();
    getCategory();
  }, []);

  const showModal = (item) => {
    setModalState({ isOpen: true, data: item });
  };

  const handleCancel = () => {
    setModalState({ isOpen: false, data: null });
  };

  const handleFinish = (item) => {
    console.log(item);
    const actionType = item.id ? "edit" : "add";
    handleItemAction(actionType, item.id, item);
    setModalState({ isOpen: false, data: null });
  };

  const handleSearch = (e) => {
    const currentVal = e.target.value.toLowerCase().trim();
    const filterData = dataSource.filter((entry) =>
      entry.name.toLowerCase().trim().includes(currentVal)
    );

    setDataSource(filterData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "img",
      key: "img",
      align: "center",
      render: (item) => <Image width={200} src={item} alt="" />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (item) => (
        <Space>
          <Button onClick={() => showModal(item)}>Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="text-center uppercase m-5 text-4xl">Quản lý sản phẩm</div>
      <div className="flex justify-center w-1/2 p-5 gap-5">
        <Button onClick={() => showModal()}>Thêm sản phẩm</Button>
        <Input placeholder="Tìm kiếm" onChange={handleSearch} />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered={true}
        size="middle"
        sticky
        rowKey="id"
      />
      <Modal
        open={modalState.isOpen}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
        centered
      >
        <Form
          name={modalState.data?.name}
          onFinish={handleFinish}
          initialValues={{
            id: modalState.data?.id,
            name: modalState.data?.name,
            price: modalState.data?.price,
            img: modalState.data?.img,
            description: modalState.data?.description,
            is_visible: modalState.data?.is_visible,
            category_id: modalState.data?.category_id,
            discount: {
              discount_amount: modalState.data?.discounts?.discount_amount,
              date: modalState.data?.discounts?.date.map((date) =>
              dayjs(date, "DD-MM-YYYY")
              ),
            },
          }}
        >
          <Form.Item name="id" label="ID">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="img"
            label="Image Link"
            rules={[{ required: true, message: "Please enter an image link" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["discount", "discount_amount"]}
            label="Discount(%)"
            rules={[{ required: false, message: "Please enter a discount" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["discount", "date"]}
            label="Discount Date Range"
            rules={[{ required: false, message: "Please select a date range" }]}
          >
            <DatePicker.RangePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item name="is_visible" label="Display" valuePropName="checked">
            <Switch checked />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Management;
