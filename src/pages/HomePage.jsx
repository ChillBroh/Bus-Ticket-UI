import React from "react";
import hero from "../assets/user/Home.jpg";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  QrcodeOutlined,
  MoneyCollectOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const HomePage = () => {
  return (
    <div className="px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
      <div className="grid lg:grid-cols-2 ">
        <div className="flex justify-center items-center h-full">
          <div>
            <h2 className="text-[56px] whitespace-nowrap font-extrabold text-[#9744BE]">
              Your Ticket
            </h2>
            <span className="text-[46px] font-extrabold whitespace-nowrap">
              To Easy Travel
            </span>
            <div className="pt-10 pb-10">
              <Link
                to="/"
                className="bg-[#9744BE] text-white font-bold px-6 py-3 rounded-md mr-4 hover:bg-[#9744BE]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div>
          <img
            className="rounded-3xl lg:h-[635px] h-full w-full object-cover"
            src={hero}
            alt="hero"
          />
        </div>
      </div>
      <div>
        <div className="text-center text-5xl text-[#9744BE] font-extrabold">
          Services
        </div>
        <div className="py-10 flex flex-col md:flex-row gap-4 justify-center">
          <div className="bg-[#F0F0F0] justify-center grid grid-rows p-10 w-48 h-48 cursor-pointer">
            <Link to={"/schedules"}>
              <div className="flex justify-center ">
                <CalendarOutlined className="text-5xl" />
              </div>
            </Link>
            <div className="text-center font-extrabold text-xl flex items-end">
              Schedule
            </div>
          </div>
          <div className="bg-[#F0F0F0] justify-center grid grid-rows p-10 w-48 h-48 cursor-pointer">
            <Link to={"/"}>
              <div className="flex justify-center">
                <QrcodeOutlined className="text-5xl" />
              </div>
            </Link>
            <div className="text-center font-extrabold text-xl flex items-end">
              Token
            </div>
          </div>
          <div className="bg-[#F0F0F0] justify-center grid grid-rows p-10 w-48 h-48 cursor-pointer">
            <Link to={"/topup-account-list"}>
              <div className="flex justify-center">
                <MoneyCollectOutlined className="text-5xl" />
              </div>
            </Link>
            <div className="text-center font-extrabold text-xl flex items-end">
              Balance
            </div>
          </div>
          <div className="bg-[#F0F0F0] justify-center grid grid-rows p-10 w-48 h-48 cursor-pointer">
            <Link to={"/user"}>
              <div className="flex justify-center">
                <UserAddOutlined className="text-5xl" />
              </div>
            </Link>
            <div className="text-center font-extrabold text-xl flex items-end">
              Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
