import React from "react";
import Menu from "./Menu";
import Banner from "./Banner";

function Content() {
  return (
    <div className="max-w-[1170px] m-auto grid grid-cols-12 relative">
      <Menu />
      <Banner />
    </div>
  );
}

export default Content;
