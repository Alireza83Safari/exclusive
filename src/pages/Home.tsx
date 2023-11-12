import  { lazy, Suspense } from "react";
const Content = lazy(() => import("../components/Content/Content"));
const Promotion = lazy(() => import("../components/Promotion"));
const Brand = lazy(() => import("../components/Brand"));
const BestSelling = lazy(() => import("../components/BestSelling"));
const Suggestion = lazy(() => import("../components/Suggestion"));
const OurProducts = lazy(() => import("../components/OurProducts"));
const Arrival = lazy(() => import("../components/Arrival"));
const Options = lazy(() => import("../components/Options"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Home() {
  return (
    <>
      <Suspense>
        <Header />
        <Content />
        <Promotion />
        <Brand />
        <BestSelling />
        <Suggestion />
        <OurProducts />
        <Arrival />
        <Options />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
