import React from "react";
import Content from "../components/Content/Content";
import Promotion from "../components/Promotion/Promotion";
import Brand from "../components/Brand";
import BestSelling from "../components/BestSelling";
import Suggestion from "../components/Suggestion";
import OurProducts from "../components/OurProducts";
import Arrival from "../components/Arrival";
import Options from "../components/Options";
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <>
      <Content />
      <Promotion />
      <Brand />
      <BestSelling />
      <Suggestion />
      <OurProducts />
      <Arrival />
      <Options />
      <Toaster />
    </>
  );
}

export default Home;
