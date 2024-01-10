import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Spin } from 'antd';
import UserServices from '../Services/UserServices';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const { Title } = Typography;

const ForgotPassword = () => {
  const userServices = new UserServices();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/404" replace />;
  }


  const handleForgotPassword = async (values) => {
    setLoading(true);

    const resetData = {
      email: values.email,
    };

    try {
      const response = await userServices.forgotPW(resetData);

      if (response.success) {
        setSuccessMessage(response.message);
      } else {
        setError('Password reset request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <Title level={2}>Forgot Password</Title>
      {error && <Alert message={error} type="error" showIcon />}
      {successMessage && <Alert message={successMessage} type="success" showIcon />}
      <Spin spinning={loading}>
        <Form form={form} onFinish={handleForgotPassword}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" disabled={loading}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default ForgotPassword;
