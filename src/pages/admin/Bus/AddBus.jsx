import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../api/axiosInstance";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const AddBus = () => {
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoute = async () => {
      const resRoute = await axiosInstance.get("route");
      setRoute(resRoute.data.body);
      setLoading(false);
    };

    getRoute();
  }, []);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to add this bus?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      if (result.isConfirmed) {
        await axiosInstance.post("bus", {
          busNo: values.busNo,
          userEmail: values.email,
          routeName: values.route,
          income: 0.0,
        });
        Swal.fire(
          "Congratulations! You Have Successfully added bus",
          "",
          "success"
        );
        navigate("/bus");
      } else {
        Swal.fire("Bus Adding Cancelled", "", "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  const handeleCancel = async (e) => {
    e.preventDefault();

    try {
      const result = await Swal.fire({
        title: "Are You Sure You want to cancel?",
        showDenyButton: true,
        confirmButtonText: "confirm",
        denyButtonText: `cancel`,
        icon: "warning",
      });

      if (result.isConfirmed) {
        navigate("/bus");
      }
    } catch (err) {
      // using err instead of error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };
  const inputStyle =
    "w-full p-3 rounded-md  border border-purple focus:outline-none focus:border-blue-500 ";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold leading-7 text-[#9744BE] text-center">
            Add a New Bus For Transport
          </h2>
          <div className="shadow-lg rounded-lg max-w-7xl mt-5 p-10 border-8 ">
            <Form
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "86",
              }}
              scrollToFirstError
            >
              <div className="pt-2">
                <Form.Item
                  name="busNo"
                  rules={[
                    {
                      required: true,
                      message: "Please input Bus Number!",
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={inputStyle} placeholder="Bus No" />
                </Form.Item>
              </div>

              <div className="pt-2">
                <Form.Item name="route" rules={[{ required: true }]}>
                  <Select placeholder="Select Bus Route" allowClear>
                    {route?.map((value) => (
                      <Option value={value.routeName}>{value.routeName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="pt-2">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input Inspector's E-mail!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className={inputStyle}
                    placeholder="Inspector's Email"
                  />
                </Form.Item>
              </div>

              <div className="pt-2">
                <Form.Item name="type" rules={[{ required: true }]}>
                  <Select placeholder="Type Of the Bus" allowClear>
                    <Option value="normal">Normal</Option>
                    <Option value="Semi-luxury">Semi Luxury</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="pt-2">
                <div>
                  <Form.Item>
                    <div className="mt-6 flex text-rightjustify-end gap-x-6">
                      <button
                        type="reset"
                        className="text-lg font-semibold leading-6  text-red-700"
                        onClick={handeleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md text-right bg-[#333333] px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-[#9744BE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Bus
                      </button>
                    </div>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBus;
