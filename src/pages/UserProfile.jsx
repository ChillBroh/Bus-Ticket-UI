import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import profile from "../assets/profile.jpg";
import axiosInstance from "../api/axiosInstance";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState();
  useEffect(() => {
    const getUsers = async () => {
      const res = await axiosInstance.get("user/get-current-user");
      setData(res.data);
    };
    getUsers();
  }, []);

  const navigate = useNavigate();
  console.log(data);

  const getUser = async () => {
    navigate("/updateProfile", { state: user });
  };

  return (
    <div className="gap-8  md:px-24 p-4 sm:py-8 mb-10 mt-10">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center items-center md:py-24 py-10 gap-5 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div>
            <img
              className="w-48 h-48 rounded-full shadow-lg border-4 border-blue-500 object-cover"
              src={profile}
              alt=""
            />
          </div>
          <div className="text-center mx-6 pt-3">
            <h1 className="text-lg">Available Points</h1>
            <h3 className="text-blue-500">1500</h3>
          </div>
          <div className="text-center">
            <h1 className="text-lg">Account Status</h1>
            <h3 className="text-blue-500">Blue</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-2 xl:ps-20 rounded-lg bg-white p-6">
          <Input
            prefix={<UserOutlined className="site-form-item-icon mr-10" />}
            value={data.name}
            className="w-full text-xl p-3  rounded-lg "
            readOnly
          />
          <Input
            prefix={<MailOutlined className="site-form-item-icon mr-10" />}
            value={data.email}
            className="w-full text-xl p-3  rounded-lg "
            readOnly
          />
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon mr-10" />}
            value={data.contactNumber}
            className="w-full text-xl p-3  rounded-lg "
            readOnly
          />

          <Input
            prefix={<IdcardOutlined className="site-form-item-icon mr-10" />}
            value={data.role === "Foreigner" ? data.passportNo : data.nic}
            className="w-full text-xl p-3  rounded-lg "
            readOnly
          />

          <Input
            prefix={<UserOutlined className="site-form-item-icon mr-10" />}
            value={data.role}
            className="w-full text-xl p-3  rounded-lg "
            readOnly
          />

          <div className="flex md:flex-row gap-5 md:mt-14">
            <button
              className="bg-[#9744BE] p-3 rounded-xl text-white font-bold"
              onClick={getUser}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
