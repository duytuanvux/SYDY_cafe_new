import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserServices from "../Services/UserServices";


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    
    try {
     const UserServiceInstance = new UserServices();
        const res = await UserServiceInstance.register(data)
      message.success(res.message || res.error);
      navigate("/login");
    } catch (error) {
      // Handle registration error, show a message, etc.
      message.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-base-cream flex">
      <div className="flex flex-col w-1/4 justify-center mx-14">
        <div className="flex justify-center">
          <Link to="/">
            <img className="w-52" src="/assets/img/logo-2nd.png" alt="" />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Create your account</span>
          <span>
            Have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Log in
            </Link>{" "}
            now
          </span>
        </div>

        <Form
          name="registerForm"
          onFinish={onFinish}
          scrollToFirstError
          initialValues={{
            email: "",
            username: "",
            fullname: "",
            password: "",
            passwordConfirmation: "",
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="passwordConfirmation"
            label="Re-enter password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="w-3/4 flex">
        <img
          className=" object-cover h-screen w-screen"
          src="/assets/img/welcome2.JPG"
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
