import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axiosInstance.get("schedule");
        setSchedule(response.data.body);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getAllData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const data = {
      scheduleId: id,
    };
    console.log(data);
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to delete this Bus?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axiosInstance.delete("bus", { data: data });
        console.log("res", res);
        Swal.fire("Bus Deleted!", "", "success");
      } catch (err) {
        console.log("err", err);
        Swal.fire(err.message, "", "error");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="lg:flex lg:justify-center  items-center space-x-4 xs:grid xs:grid-rows-2 sm:grid sm:grid-cols-2  mt-10">
          <p className="text-center text-5xl font-bold ">All Schedules</p>
        </div>

        <div className="lg:w-full px-48 mb-10">
          <div className="flex justify-end mb-10">
            <Link to={"/add-schedule"} className="items-end">
              <Button
                btnName="Add a Schedule"
                color="#9744BE"
                className="rounded-xl"
              />
            </Link>
          </div>
          <select className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9744BE]">
            <option value="All Types">All Types</option>
          </select>
        </div>
        <>
          <div className="mx-auto max-w- px-4 lg:w-full sm:px-6   lg:px-8 mb-24">
            <div className="lg:w-full px-48 mb-10">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-center text-sm font-light">
                        <thead className="border-b bg-[#9744BE] font-medium dark:border-neutral-800 text-white text-2xl mb-5">
                          <tr>
                            <th scope="col" className=" px-6 py-4">
                              Bus Number
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Route
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Start Point
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              End Point
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Start Time
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              End Time
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Ticket Price
                            </th>
                            <th scope="col" className=" px-6 py-4"></th>
                          </tr>
                        </thead>
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            {schedule.map((value, index) => (
                              <tbody
                                key={index}
                                className="hover:bg-gray-200 text-lg mt-5"
                              >
                                <tr className="border-b font-bold dark:border-neutral-500">
                                  <td className="whitespace-wrap  px-6 py-4 font-medium">
                                    {value.bus ? value.bus.busNo : "-"}
                                  </td>
                                  <td className="whitespace-wrap  px-6 py-4">
                                    {value.routeName.routeName}
                                  </td>
                                  <td className="whitespace-wrap  px-6 py-4">
                                    {value.routeName.startPoint}
                                  </td>
                                  <td className="whitespace-wrap  px-6 py-4">
                                    {value.routeName.endPoint}
                                  </td>
                                  <td className="whitespace-wrap  px-6 py-4">
                                    {value.startTime}
                                  </td>
                                  <td className="whitespace-wrap  px-6 py-4">
                                    {value.endTime}
                                  </td>
                                  <td className="whitespace-wrap  px-6 py-4">
                                    {value.routeName.ticketPrice}
                                  </td>
                                  <td className="whitespace-wrap  px-6 py-4">
                                    <div className="flex justify-center space-x-2">
                                      <Link
                                        to={`/update-main-quiz/${value.busNo}`}
                                      >
                                        <div>
                                          <button className="text-blue-500 hover:text-blue-700 transition duration-300 inline-block px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200">
                                            update
                                          </button>
                                        </div>
                                      </Link>
                                      <div>
                                        <button
                                          onClick={() =>
                                            handleDelete(value.scheduleId)
                                          }
                                          className="text-red-500 hover:text-red-700 transition duration-300 inline-block lg:ml-3 px-3 py-1 rounded-lg lg:mt-0 mt-2 bg-red-100 hover:bg-red-200"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Schedule;
