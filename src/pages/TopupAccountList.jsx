import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { initTE, Ripple } from "tw-elements";
import Loader from "../components/Loader";

const TopupAccountList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAccount = async () => {
      const res = await axiosInstance.get("top-up-acc");
      setData(res.data.body);
      setLoading(false);
    };
    getAccount();
  }, []);
  initTE({ Ripple });

  const handleDelete = async (key) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to delete this account?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axiosInstance.delete("top-up-acc", {
          id: key,
        });
        console.log(res);
        Swal.fire("Account Deleted!", "", "success");
      } catch (err) {
        console.log(err);
        Swal.fire(err.message, "", "error");
      }
    }
  };
  return (
    <div>
      <div className="text-center text-5xl font-extrabold pt-10 pb-10">
        My Topup Acocunt List
      </div>
      <div className="mx-auto max-w- px-4 lg:w-full sm:px-6    lg:px-8 mb-4">
        <Link to={"/topup-account-create"}>
          <div className="flex justify-end">
            <button
              type="button"
              class="inline-block rounded bg-[#9744BE] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7f5492] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#9763ae] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#9744BE] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Add a Topup Account
            </button>
          </div>
        </Link>
      </div>
      <div className="mx-auto max-w- px-4 lg:w-full sm:px-6   lg:px-8 mb-24">
        <div className="lg:w-full px-48 mb-10">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b bg-[#9744BE] font-medium dark:border-neutral-800 text-white text-2xl">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          Account ID
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Account Type
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Account Balance
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Family Member Name
                        </th>
                        <th scope="col" className=" px-6 py-4"></th>
                      </tr>
                    </thead>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {data.map((value, index) => (
                          <tbody
                            key={value.id}
                            className="hover:bg-gray-200 text-xl"
                          >
                            <tr className="border-b font-bold dark:border-neutral-500">
                              <td className="whitespace-wrap  px-6 py-4 font-medium">
                                {value.id}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.type}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.balance}
                              </td>
                              <td className="whitespace-wrap  px-6 py-4">
                                {value.childName ? value.childName : "-"}
                              </td>

                              <td className="whitespace-wrap  px-6 py-4">
                                <div className="flex justify-center space-x-2">
                                  <Link
                                    to={`/recharge/${value.id}/${value.balance}`}
                                  >
                                    <div>
                                      <button
                                        type="button"
                                        class="inline-block rounded bg-[#9744BE] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7f5492] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#9763ae] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#9744BE] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                      >
                                        Recharge
                                      </button>
                                    </div>
                                  </Link>
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => handleDelete(value.id)}
                                      class="inline-block rounded bg-[#ec3c3c] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:red focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#ec3c3c] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
    </div>
  );
};

export default TopupAccountList;
