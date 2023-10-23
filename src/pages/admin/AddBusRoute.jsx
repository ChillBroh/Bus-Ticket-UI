import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { Form, Input } from "antd";

const AddBusRoute = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to add this Route?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      if (result.isConfirmed) {
        await axiosInstance.post("route", {
          routeName: values.routeName,
          startPoint: values.startPoint,
          endPoint: values.endPoint,
          ticketPrice: values.ticketPrice,
        });
        Swal.fire(
          "Congratulations! You Have Successfully added Route",
          "",
          "success"
        );
        navigate("/bus");
      } else {
        Swal.fire("Route Adding Cancelled", "", "error");
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
            Add a New Route For Transport
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
                  name="routeName"
                  rules={[
                    {
                      required: true,
                      message: "Please input Bus Route!",
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={inputStyle} placeholder="Route Number" />
                </Form.Item>
              </div>
              <div className="pt-2">
                <Form.Item
                  name="startPoint"
                  rules={[
                    {
                      required: true,
                      message: "Please input Start Point!",
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={inputStyle} placeholder="Starting Point" />
                </Form.Item>
              </div>

              <div className="pt-2">
                <Form.Item
                  name="endPoint"
                  rules={[
                    {
                      required: true,
                      message: "Please input End Point!",
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={inputStyle} placeholder="Ending Point" />
                </Form.Item>
              </div>
              <div className="pt-2">
                <Form.Item
                  name="ticketPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please input TicketPrice!",
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={inputStyle} placeholder="Ticket Price" />
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
                        Add Route
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

export default AddBusRoute;
