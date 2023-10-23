import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import profile from "../assets/profile.jpg";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";
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
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({}); // State to store edited data

  useEffect(() => {
    const getUsers = async () => {
      const res = await axiosInstance.get("user/get-current-user");
      setData(res.data);
      setLoading(false);
    };
    getUsers();
  }, []);

  const getUser = () => {
    setEditMode(true);
  };

  const handleEdit = (key, value) => {
    setEditedData({
      ...editedData,
      [key]: value,
    });
  };

  const saveChanges = async () => {
    console.log(editedData);
    setEditMode(false);

    try {
      await axiosInstance.put("user/update-profile", editedData);
      setEditMode(false);
      setData({
        ...data,
        ...editedData,
      });
    } catch (error) {}
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
          {/* <div className="text-center mx-6 pt-3">
            <h1 className="text-lg">Available Points</h1>
            <h3 className="text-blue-500">1500</h3>
          </div>
          <div className="text-center">
            <h1 className="text-lg">Account Status</h1>
            <h3 className="text-blue-500">Blue</h3>
          </div> */}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col justify-center items-start gap-2 xl:ps-20 rounded-lg bg-white p-6">
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-10" />}
                value={editMode ? editedData.name || data.name : data.name}
                onChange={(e) => handleEdit("name", e.target.value)}
                className="w-full text-xl p-3  rounded-lg"
                readOnly={!editMode}
              />
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-10" />}
                value={editMode ? editedData.email || data.email : data.email}
                onChange={(e) => handleEdit("email", e.target.value)}
                className="w-full text-xl p-3  rounded-lg"
                readOnly={!editMode}
              />
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon mr-10" />}
                value={
                  editMode
                    ? editedData.contactNumber || data.contactNumber
                    : data.contactNumber
                }
                onChange={(e) => handleEdit("contactNumber", e.target.value)}
                className="w-full text-xl p-3  rounded-lg"
                readOnly={!editMode}
              />

              <Input
                prefix={
                  <IdcardOutlined className="site-form-item-icon mr-10" />
                }
                value={
                  editMode
                    ? data.role === "Foreigner"
                      ? editedData.passportNo || data.passportNo
                      : editedData.nic || data.nic
                    : data.role === "Foreigner"
                    ? data.passportNo
                    : data.nic
                }
                onChange={(e) =>
                  handleEdit(
                    data.role === "Foreigner" ? "passportNo" : "nic",
                    e.target.value
                  )
                }
                className="w-full text-xl p-3  rounded-lg"
                readOnly={!editMode}
              />

              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-10" />}
                value={editMode ? editedData.role || data.role : data.role}
                onChange={(e) => handleEdit("role", e.target.value)}
                className="w-full text-xl p-3  rounded-lg"
                readOnly={!editMode}
              />

              <div className="flex md:flex-row gap-5 md:mt-14">
                {editMode ? (
                  <button
                    className="bg-[#9744BE] p-3 rounded-xl text-white font-bold"
                    onClick={saveChanges}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-[#9744BE] p-3 rounded-xl text-white font-bold"
                    onClick={getUser}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
