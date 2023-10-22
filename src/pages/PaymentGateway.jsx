import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [amount, setAmount] = useState();

  const submit = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to Recharge this account?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Recharge it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });
    if (confirmResult.isConfirmed) {
      try {
        const res = await axiosInstance.post("/recharge", {
          id: id,
          amount: amount,
        });
        const balance = res.data.body.balance;
        Swal.fire("Account Recharged!", "", "success");
        navigate(`/recharge/${id}/${balance}`);
      } catch (err) {
        console.log(err);
        Swal.fire(err.message, "", "error");
      }
    }
  };
  return (
    <div>
      <div class="mx-auto px-4 lg:w-full max-w-5xl  sm:px-6 lg:px-8 mb-10 mt-16">
        <div class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
          <div class="w-full pt-1 pb-5">
            <div class="bg-[#9744BE] text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i class="mdi mdi-credit-card-outline text-3xl"></i>
            </div>
          </div>
          <div class="mb-10">
            <h1 class="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>
          <div class="mb-3 flex -mx-2">
            <div class="px-2">
              <label htmlFor="type1" class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  class="htmlForm-radio h-5 w-5 text-[#9744BE]"
                  name="type"
                  id="type1"
                  checked
                />
                <img
                  src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                  class="h-8 ml-3"
                  alt=""
                />
              </label>
            </div>
          </div>
          <div class="mb-3">
            <label class="font-bold text-sm mb-2 ml-1">Amount</label>
            <div>
              <input
                name="amount"
                class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9744BE] transition-colors"
                placeholder="Rs. 5000"
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
            <div>
              <input
                class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9744BE] transition-colors"
                placeholder="John Smith"
                type="text"
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="font-bold text-sm mb-2 ml-1">Card number</label>
            <div>
              <input
                class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9744BE] transition-colors"
                placeholder="0000 0000 0000 0000"
                type="number"
              />
            </div>
          </div>
          <div class="mb-3 -mx-2 flex items-end">
            <div class="px-2 w-1/2">
              <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
              <div>
                <select class="htmlForm-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9744BE] transition-colors cursor-pointer">
                  <option value="01">01 - January</option>
                  <option value="02">02 - February</option>
                  <option value="03">03 - March</option>
                  <option value="04">04 - April</option>
                  <option value="05">05 - May</option>
                  <option value="06">06 - June</option>
                  <option value="07">07 - July</option>
                  <option value="08">08 - August</option>
                  <option value="09">09 - September</option>
                  <option value="10">10 - October</option>
                  <option value="11">11 - November</option>
                  <option value="12">12 - December</option>
                </select>
              </div>
            </div>
            <div class="px-2 w-1/2">
              <select class="htmlForm-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9744BE] transition-colors cursor-pointer">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
          </div>
          <div class="mb-10">
            <label class="font-bold text-sm mb-2 ml-1">Security code</label>
            <div>
              <input
                class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9744BE] transition-colors"
                placeholder="000"
                type="number"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={submit}
              class="block w-full max-w-xs mx-auto bg-[#9744BE] hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              <i class="mdi mdi-lock-outline mr-1"></i> PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
