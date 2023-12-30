import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserServices from "../Services/UserServices";
import { loginSuccess } from "../Redux/Reducers/AuthReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (data) => {
    try {
      const UserServiceInstance = new UserServices();
      const res = await UserServiceInstance.login(data);
      dispatch(loginSuccess(res.data))
      if (res.data.is_admin) {
        navigate('/management');
      } else {
        navigate('/');
      }
      message.success(res.message || res.error);
    } catch (error) {
      message.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-base-cream flex">
      <div className="w-3/4">
        <img
          className="object-cover h-screen w-screen"
          src="/assets/img/welcome1.JPG"
          alt=""
        />
      </div>
      <div className="w-1/4 flex flex-col mx-14 mt-10">
        <div className="flex justify-center">
          <Link to="/">
            <img className="w-52" src="/assets/img/logo-2nd.png" alt="" />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Log in to your account</span>
          <span>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Sign up
            </Link>
          </span>
        </div>
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
              { min: 2, message: "Username must be at least 5 characters" },
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
            <Button htmlType="submit">Log in</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
