import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserServices from "../Services/UserServices";
import { setUserInfo } from "../Redux/Reducers/UserReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    try {
      const UserServiceInstance = new UserServices();
      const res = await UserServiceInstance.login(data);
      console.log(res)
      dispatch(setUserInfo(res.data));
      if (res.data.is_admin) {
        // Navigate to the admin path or any other path for admins
        navigate("/management");
      } else {
        // Navigate to the default path for non-admin users
        navigate("/");
      }
      message.success(res.message || res.error)
    } catch (error) {
        message.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-base-cream flex">
      {/* ... (your other components remain the same) */}
      <div className="w-1/4 flex flex-col mx-14 mt-10">
        {/* ... (your other components remain the same) */}
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "This field is required" },
              { min: 5, message: "Username must be at least 5 characters" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
