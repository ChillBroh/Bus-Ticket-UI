import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const TopupAccountCreate = () => {
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  const onTypeChange = (value) => {
    switch (value) {
      case "personal":
        formRef.current?.setFieldsValue({
          initailDeposite: "500",
        });
        break;
      case "family":
        formRef.current?.setFieldsValue({
          initailDeposite: "2000",
        });
        break;
      default:
        break;
    }
  };
  const onFinish = async (values) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to add this Account?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      if (result.isConfirmed) {
        values.type === "personal"
          ? await axiosInstance.post("top-up-acc", {
              type: values.type,
            })
          : await axiosInstance.post("top-up-acc", {
              type: values.type,
              familyMembers: values.name,
            });
        Swal.fire(
          "Congratulations! You Have Successfully added Account!",
          "",
          "success"
        );
        navigate("/topup-account-list");
      } else {
        Swal.fire("Account Adding Cancelled", "", "error");
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
        navigate("/");
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
    "w-full p-3 rounded-lg  border border-purple focus:outline-none focus:border-blue-500 ";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
      <div className="space-y-12">
        <h2 className="text-3xl font-semibold leading-7 text-[#111111] text-center">
          TopUp Account - Family/ Personal
        </h2>
        <div>
          <div className=" shadow-lg rounded-lg max-w-7xl mt-5 p-10 border-4 ">
            <Form
              ref={formRef}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "86",
              }}
              scrollToFirstError
            >
              <div className="pt-2">
                <Form.Item
                  name="initailDeposite"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Initial Deposite"
                    className={inputStyle}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="pt-2">
                <Form.Item name="type" rules={[{ required: true }]}>
                  <Select
                    placeholder="Select Account Type"
                    allowClear
                    onChange={onTypeChange}
                  >
                    <Option value="personal">Personal Account</Option>
                    <Option value="family">Family Account</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="pt-2">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.type !== currentValues.type
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("type") === "family" ? (
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          className={inputStyle}
                          placeholder="Enter Family Member Name"
                        />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
              </div>

              <div className="pt-2">
                <div>
                  <Form.Item>
                    <div className="mt-6 flex justify-end  gap-x-6">
                      <button
                        type="reset"
                        className="text-lg font-semibold leading-6  text-red-700"
                        onClick={handeleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md text-right bg-[#9744BE] px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Account
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

export default TopupAccountCreate;
