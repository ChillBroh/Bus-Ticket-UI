import React, { useEffect } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { Ripple, initTE } from "tw-elements";

const Login = () => {
  useEffect(() => {
    initTE({ Ripple });
  });

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
                  <button
                    type="submit"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Login
                  </button>
                  <div className="whitespace-nowrap text-center">
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
