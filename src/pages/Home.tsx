import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner/Spinner";

const Content = lazy(() => import("../components/Content/Content"));
const Promotion = lazy(() => import("../components/Promotion"));
const Brand = lazy(() => import("../components/Brand"));
const BestSelling = lazy(() => import("../components/BestSelling"));
const Suggestion = lazy(() => import("../components/Suggestion"));
const OurProducts = lazy(() => import("../components/OurProducts"));
const Arrival = lazy(() => import("../components/Arrival"));
const Options = lazy(() => import("../components/Options"));

function Home() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Content />
        <Promotion />
        <Brand />
        <BestSelling />
        <Suggestion />
        <OurProducts />
        <Arrival />
        <Options />
        <Toaster />
      </Suspense>
    </>
  );
}

export default Home;
