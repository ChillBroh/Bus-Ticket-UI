import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Table from "../../../components/Table";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const Bus = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [BusesFilter, setBusesFilter] = useState("All Types");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axiosInstance.get("bus");
        setBuses(response.data.body);
        setDeleted(false);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getAllData();
  }, [deleted]);

  console.log(deleted);

  const routeBus = Array.from(new Set(buses.map((type) => type.busNo)));
  console.log("route", routeBus);

  // const fillterdDisease = buses.filter((value) => {
  //   return value.disease === disease;
  // });

  const handleDelete = (id) => {
    const ListafterDel = buses.filter((questio) => {
      return buses._id !== id;
    });
    setBuses(ListafterDel);
    setDeleted(true);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="lg:flex lg:justify-center  items-center space-x-4 xs:grid xs:grid-rows-2 sm:grid sm:grid-cols-2  mt-10">
            <p className="text-center text-5xl font-bold ">All Buses</p>
          </div>

          <div className="lg:w-full px-48 mb-10">
            <div className="flex justify-end mb-10">
              <Link to={"/add-bus"} className="items-end">
                <Button
                  btnName="Add a Bus"
                  color="#9744BE"
                  className="rounded-xl"
                />
              </Link>
            </div>
            <select
              onChange={(e) => setBusesFilter(e.target.value)}
              className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9744BE]"
            >
              <option value="All Types">All Types</option>
              {/* {routeBus.map((disease, index) => (
                <option key={index} value={disease}>
                  {disease}
                </option>
              ))} */}
            </select>
          </div>

          <Table
            // data={disease === "All Types" ? buses : fillterdDisease}
            data={buses}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Bus;
