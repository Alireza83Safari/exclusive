// App.tsx
import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Index() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <Header />
      <div className="xl:container xl:mx-auto">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

export default Index;
