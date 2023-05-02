import React from "react";
import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="spinner w-full h-screen flex items-center justify-center bg-white dark:bg-bg-color">
      <RingLoader color="#8D5EA3" />
    </div>
  );
};

export default Spinner;
