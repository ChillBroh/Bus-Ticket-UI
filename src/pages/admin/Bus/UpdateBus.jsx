import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../api/axiosInstance";
import { Form, Input, Select } from "antd";
import Loader from "../../../components/Loader";
const { Option } = Select;

const UpdateBus = () => {
  const [route, setRoute] = useState([]);
  const [bus, setBus] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getRoute = async () => {
      const resRoute = await axiosInstance.get("route");
      const resBus = await axiosInstance.post("bus/find", {
        busNo: id,
      });
      setBus(resBus.data.body);
      setRoute(resRoute.data.body);
      setLoading(false);
    };

    getRoute();
  }, [id]);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const result = await Swal.fire({
        title: "Do you want to update this bus?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      if (result.isConfirmed) {
        await axiosInstance.post("bus/update", {
          busNo: values.busNo,
          userEmail: values.email,
          routeName: values.route,
          income: 0.0,
        });
        Swal.fire("Bus details updated successfully", "", "success");
        navigate("/bus");
      } else {
        Swal.fire("Bus Update Cancelled", "", "error");
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
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
        icon: "warning",
      });

      if (result.isConfirmed) {
        navigate("/bus");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  const inputStyle =
    "w-full p-3 rounded-md border border-purple focus:outline-none focus:border-blue-500 ";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold leading-7 text-[#9744BE] text-center">
            Update Bus Details
          </h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="shadow-lg rounded-lg max-w-7xl mt-5 p-10 border-8">
              <Form
                name="update"
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
                    initialValue={bus.busNo}
                  >
                    <Input
                      className={inputStyle}
                      placeholder="Bus No"
                      readOnly
                    />
                  </Form.Item>
                </div>

                <div className="pt-2">
                  <Form.Item
                    name="route"
                    rules={[{ required: true }]}
                    initialValue={bus.route.routeName}
                  >
                    <Select placeholder="Select Bus Route" allowClear>
                      {route?.map((value) => (
                        <Option value={value.routeName}>
                          {value.routeName}
                        </Option>
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
                        message: "The input is not a valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input Inspector's E-mail!",
                      },
                    ]}
                    hasFeedback
                    initialValue={
                      bus.user != null ? bus.user.email : "No Inspector"
                    }
                  >
                    <Input
                      className={inputStyle}
                      placeholder="Inspector's Email"
                    />
                  </Form.Item>
                </div>

                <div className="pt-2">
                  <div>
                    <Form.Item>
                      <div className="mt-6 flex text-right justify-end gap-x-6">
                        <button
                          type="reset"
                          className="text-lg font-semibold leading-6 text-red-700"
                          onClick={handeleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md text-right bg-[#333333] px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-[#9744BE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Update Bus
                        </button>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateBus;
