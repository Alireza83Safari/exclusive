import React from "react";
import Content from "../components/Content/Content";
import Promotion from "../components/Promotion/Promotion";
import Category from "../components/Category/Category";
import BestSelling from "../components/BestSelling";
import Suggestion from "../components/Suggestion";
import OurProducts from "../components/OurProducts";
import Arrival from "../components/Arrival";
import Options from "../components/Options";

function Home() {
  return (
    <>
      <Content />
      <Promotion />
      <Category />
      <BestSelling />
      <Suggestion />
      <OurProducts />
      <Arrival />
      <Options />
    </>
  );
}

export default Home;
