import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner/Spinner";
const Content = lazy(() => import("../components/Content/Content"));
const Promotion = lazy(() => import("../components/Homepage/Promotion"));
const Brand = lazy(() => import("../components/Homepage/Brand"));
const BestSelling = lazy(() => import("../components/Homepage/BestSelling"));
const Suggestion = lazy(() => import("../components/Homepage/Suggestion"));
const OurProducts = lazy(() => import("../components/Homepage/OurProducts"));
const Arrival = lazy(() => import("../components/Homepage/Arrival"));
const Options = lazy(() => import("../components/Homepage/Options"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Spinner />}>
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
    </div>
  );
}

export default Home;
