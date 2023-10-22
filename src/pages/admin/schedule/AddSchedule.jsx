import React, { useEffect, useState } from "react";
import { Form, Select, TimePicker, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../api/axiosInstance";
import Loader from "../../../components/Loader";
const { Option } = Select;

const AddSchedule = () => {
  const [route, setRoute] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getBuses = async () => {
      const resBus = await axiosInstance.get("bus");
      setBuses(resBus.data.body);
    };
    const getRoute = async () => {
      const resRoute = await axiosInstance.get("route");
      setRoute(resRoute.data.body);
    };
    setLoading(false);
    getBuses();
    getRoute();
  }, []);
  const onFinish = async (values) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to add this Schedule?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      if (result.isConfirmed) {
        await axiosInstance.post("schedule", {
          startTime: values.time[0].format("HH:mm:ss"),
          endTime: values.time[1].format("HH:mm:ss"),
          date: values.date.format("YYYY-MM-DD"),
          busNo: values.busNo,
          routeName: values.route,
        });
        Swal.fire(
          "Congratulations! You Have Successfully added Schedule",
          "",
          "success"
        );
        navigate("/schedule-admin");
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
        navigate("/Schedule-admin");
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8 mb-16">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold leading-7 text-[#9744BE] text-center">
            Add a New Schedule For Buses
          </h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="shadow-lg rounded-lg max-w-7xl  p-10 mt-16 border-4 ">
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
                      { required: true, message: "Please Select Bus Number" },
                    ]}
                    hasFeedback
                  >
                    <Select placeholder="Select Bus Number" allowClear>
                      {buses?.map((value) => (
                        <Option value={value.busNo}>{value.busNo}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="pt-2">
                  <Form.Item
                    name="route"
                    rules={[
                      { required: true, message: "Please Select Bus Route" },
                    ]}
                    hasFeedback
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
                    name="time"
                    rules={[
                      {
                        required: true,
                        message: "Please input Start and End Time",
                      },
                    ]}
                    hasFeedback
                  >
                    <TimePicker.RangePicker />
                  </Form.Item>
                </div>

                <div className="pt-2">
                  <Form.Item
                    name="date"
                    rules={[{ required: true, message: "Please input Date" }]}
                    hasFeedback
                  >
                    <DatePicker />
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
                          Add a Schedule
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

export default AddSchedule;
