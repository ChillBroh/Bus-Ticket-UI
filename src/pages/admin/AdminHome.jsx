import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Admin from "../../assets/admin/adminprofile.jpg";
import { AuthContext } from "../../context/authContext";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  console.log(user.decodedJWT.sub);
  return (
    <div>
      <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
        <div className="flex justify-center items-center h-full">
          <div>
            <div className="flex md:flex-row flex-col">
              <h2 className="text-[56px] font-extrabold mr-4">Welcome</h2>
              <span className="text-[56px] font-extrabold text-[#9744BE]">
                Admin
              </span>
            </div>
            <h2 className="pt-8 text-2xl font-semibold">
              {user.decodedJWT.sub}
            </h2>
            <div className="pt-10">
              <Link
                to="/admin"
                className="bg-[#9744BE] text-white font-bold px-6 py-3 rounded-md mr-4"
              >
                View Statistics
              </Link>
            </div>
          </div>
        </div>

        <div>
          <img
            className="rounded-3xl lg:h-[480px] h-full w-full object-cover"
            src={Admin}
            alt=""
          />
        </div>
      </div>
      <div className="lg:px-28 px-12 pb-3">
        <span className="text-xl font-bold ">Sections</span>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-4 gap-3 mt-5 lg:px-24 px-12 ">
        {/* Button Cards */}
        <Link
          to="/bus"
          className="bg-gray-200 hover:bg-[#9744BE] hover:text-white text-[#9744BE] font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Buses
        </Link>
        <Link
          to="/adminTVideoTutorialList"
          className="bg-gray-200 text-[#9744BE] hover:bg-[#9744BE] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Bus Schedules
        </Link>
        <Link
          to="/adminDoctorList"
          className="bg-gray-200 text-[#9744BE] hover:bg-[#9744BE] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Bus Routes
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-4 gap-3 lg:mt-5 mt-4 lg:px-24 px-12 pb-28">
        {/* Button Cards */}
        <Link
          to="/view-all-questions"
          className="bg-gray-200 hover:bg-[#9744BE] hover:text-white text-[#9744BE] font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          User Income Details
        </Link>
        <Link
          to="/infant_view_quiz"
          className="bg-gray-200 text-[#9744BE] hover:bg-[#9744BE] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Bus Income Details
        </Link>
        <Link
          to="/add"
          className="bg-gray-200 text-[#9744BE] hover:bg-[#9744BE] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Users
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
