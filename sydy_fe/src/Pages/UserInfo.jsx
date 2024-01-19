import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Card, Tabs, Spin } from "antd";
import UserServices from "../Services/UserServices";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;
const UserInfo = ({ userId }) => {
  const userInfo = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data from the API using the provided userId
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const UserServiceInstance = new UserServices();
        const userData = await UserServiceInstance.getUserInfo(
          userInfo.user_id
        );
        setUserData(userData.data[0]);
        form.setFieldsValue(userData.data[0]);
      } catch (error) {
        message.error("Error fetching user data:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchUserData();
  }, [userId, form]);

  const onFinish = async (data) => {
    try {
      setLoading(true);
      const UserServiceInstance = new UserServices();
      const res = await UserServiceInstance.updateUserInfo(
        userInfo.user_id,
        data
      );

      message.success("User information updated successfully!");
    } catch (error) {
      message.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const onPasswordChangeFinish = async (data) => {
    try {
      setLoading(true);
      const UserServiceInstance = new UserServices();
      const res = await UserServiceInstance.changePW(
        userInfo.user_id,
        data
      );

      message.success("Password changed successfully!");
    } catch (error) {
      message.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {loading && <Spin fullscreen />}
      <Card bordered={false} style={{ width: "50%" }}>
        <Tabs defaultActiveKey="1" destroyInactiveTabPane>
          <TabPane tab="User Information" key="1">
            <Form
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              onFinish={onFinish}
            >
              <Form.Item label="User ID" name="user_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Username" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Fullname"
          name="fullname"
          rules={[{ required: true, message: "Please input your fullname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone!" },
            {
              pattern: /^\d{10}$/,
              message: "Please enter a valid phone number!",
            },
            { max: 11, message: "Phone number must be at most 11 digits long" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                <Button htmlType="submit" >Update</Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <Form
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              onFinish={onPasswordChangeFinish}
            >
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: "Please input your current password!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: "Please input your new password!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Re-enter Password"
                name="confirmNewPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your new password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The two passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                <Button htmlType="submit" >Change Password</Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserInfo;
