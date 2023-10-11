import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/auth", {
        email: values.email,
        password: values.password,
      });
      console.log(res);
      alert("authorized");
    } catch (err) {
      alert("unauthorized");
    }
  };

  return (
    <div>
      <div className="mt-20 grid grid-cols-6">
        <div className="col-span-2"></div>
        <div className="col-span-2">
          <div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  type="email"
                  placeholder="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                className="mb-4" // Apply a custom class to the Form.Item
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <div className="flex justify-between space-x-2">
                  <Checkbox>Remember me</Checkbox>{" "}
                  {/* Apply a custom class and Tailwind classes to Checkbox */}
                  <Link to={"/"} className="text-gray-500 hover:text-blue-500">
                    Forgot password
                  </Link>{" "}
                  {/* Apply Tailwind classes to Link */}
                </div>
              </Form.Item>

              <Form.Item>
                <div className="flex flex-col mt-5 mb-5">
                  <Button
                    htmlType="submit"
                    className="login-form-button bg-blue-500 text-white hover:text-white"
                  >
                    Log in
                  </Button>
                  <div className="whitespace-nowrap text-center">
                    {" "}
                    Or <Link to={"/"}>register now!</Link>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
