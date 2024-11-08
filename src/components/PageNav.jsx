import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const PageNav = ({ title }) => {
  const navigate = useNavigate();

  // Function to handle going back
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <header className="flex items-center justify-start bg-[--header-bg-color]">
      <button onClick={handleBack} className="font-bold text-[--primary-color] text-2xl mr-4">
        {/* <MdArrowBack /> */}
        <IoIosArrowBack />
      </button>
      <h1 className="text-xl font-semibold text-[--header-text-color]">{title ? title : ''}</h1>
    </header>
  );
};

export default PageNav;
