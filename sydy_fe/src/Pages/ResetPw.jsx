// ResetPassword.js
import React, { useState, useEffect } from "react";
import { Input, Button, Form, Typography, Alert, Spin } from "antd";
import UserServices from "../Services/UserServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ResetPassword = () => {
  const userServices = new UserServices();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/404" replace />;
  }

  const handleResetPassword = async (values) => {
    setLoading(true);

    // You should implement the logic to send a request to your backend to reset the password.
    // Include token, newPassword, and confirmPassword in the request body.

    // Example:
    const resetData = {
      token,
      newPassword: values.newPassword,
    };

    try {
      const response = await userServices.resetPW(resetData);

      if (response.success) {
        setSuccessMessage(response.message);
        navigate('/login');
      } else {
        setError("Password reset failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Function to parse URL parameters
    const getUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get("token");
    };

    // Get token from URL and set it to state
    const tokenFromUrl = getUrlParams();
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <Title level={2}>Reset Password</Title>
      {error && <Alert message={error} type="error" showIcon />}
      {successMessage && (
        <Alert message={successMessage} type="success" showIcon />
      )}
      <Spin spinning={loading}>
        <Form form={form} onFinish={handleResetPassword}>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter the new password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              { required: true, message: "Please confirm the new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default ResetPassword;
