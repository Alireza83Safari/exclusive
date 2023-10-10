import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="flex justify-center items-center m-auto relative h-screen">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
  );
}

export default Spinner;
