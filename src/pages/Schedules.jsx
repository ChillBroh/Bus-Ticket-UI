import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axiosInstance from "../api/axiosInstance";

const Schedules = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getSchedules = async () => {
        const res = await axiosInstance.get("schedule");
        setData(res.data.body);
        setLoading(false);
      };
      getSchedules();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);
  console.log(data);
  const slicedData = data.slice(0, 10);
  return (
    <div className="mx-auto px-4 lg:w-full sm:px-6 lg:px-8 mb-10">
      <div className="text-center text-[#9744BE] text-3xl md:text-5xl font-extrabold pt-10 pb-10">
        Bus Schedules
      </div>
      <div className="mt-10">
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
                        {slicedData.map((value, index) => (
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
    </div>
  );
};

export default Schedules;
