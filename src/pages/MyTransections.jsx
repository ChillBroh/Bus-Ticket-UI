import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axiosInstance from "../api/axiosInstance";

const MyTransections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getSchedules = async () => {
        const res = await axiosInstance.get("recharge/user");
        setData(res.data.body);
        setLoading(false);
      };
      getSchedules();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);
  //   console.log(data);
  //   const slicedData = data.slice(0, 10);
  return (
    <div className="mx-auto px-4 lg:w-full sm:px-6 lg:px-8 mb-10">
      <div className="text-center text-[#9744BE] text-3xl md:text-5xl font-extrabold pt-10 pb-10">
        My Transections
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
                          Transection ID
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Account ID
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Date And Time
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Account Type
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Family Member Name
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Recharged Amount
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Total Balance
                        </th>
                      </tr>
                    </thead>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {data.map((value, index) => (
                          <tbody
                            key={index}
                            className="hover:bg-gray-200 text-lg mt-5"
                          >
                            <tr className="border-b font-bold dark:border-neutral-500">
                              <td className="whitespace-wrap  px-6 py-4 font-medium">
                                {value.id}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.topUpAcc.id}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.date} {value.time}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.topUpAcc.type}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.topUpAcc.childName
                                  ? value.topUpAcc.childName
                                  : "-"}
                              </td>
                              <td className="whitespace-wrap text-green-600 px-6 py-4">
                                {value.amount}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.topUpAcc.balance}
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

export default MyTransections;
