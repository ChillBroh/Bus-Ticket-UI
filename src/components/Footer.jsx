import React from "react";
import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#DCDCDC] p-10 grid md:grid-cols-2 gap-8 text-gray-300 bottom-0 mt-16">
      <div className="">
        <h3 className="text-2xl font-bold text-[#1E1E1E]">
          Copyright @2023 <span className="text-[#9744BE]">GoTicket</span>
        </h3>
      </div>
      <div className="flex md:justify-around justify-start mt-8">
        {" "}
        <div className="flex text-[#333333] justify-end gap-10 md:w-[75%] mt-8">
          <FaWhatsappSquare size={30} />
          <FaFacebookSquare size={30} />
          <FaInstagramSquare size={30} />
          <FaTwitterSquare size={30} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
