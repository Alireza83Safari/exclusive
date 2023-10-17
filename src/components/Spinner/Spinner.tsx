import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="flex justify-center items-center min-w-full">
      <span className="loader"></span>
    </div>
  );
}

export default Spinner;
