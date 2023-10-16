import React from "react";
import wallet from "../assets/user/recharge.jpg";
import { useNavigate, useParams } from "react-router-dom";

const Balance = () => {
  const navigate = useNavigate();
  const { id, balance } = useParams();

  const handleRecharge = () => {
    navigate(`/payment/${id}`);
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
      <div className="grid grid-rows mt-10">
        <div>
          <h1 className="text-[#9744BE] text-2xl font-extrabold">
            My Account Balance
          </h1>
        </div>
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2">
            <div className="flex justify-between items-end text-2xl">
              <div>Balance</div>
              <div>{balance}</div>
            </div>
            <div className="pt-10">
              <button
                type="button"
                onClick={handleRecharge}
                class="w-full rounded bg-[#9744BE] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7c5290] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#9744BE] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#9744BE] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Recharge
              </button>
            </div>
          </div>
          <div className="flex justify-start">
            <img src={wallet} alt="wallet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
