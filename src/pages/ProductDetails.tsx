import { Suspense, lazy } from "react";
import { DetailContextProvider } from "../components/ProductDetails/Context/DetailsContext";
import Details from "../components/ProductDetails/Details";
import HeaderSkelton from "../skelton/HeaderSkelton";
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

const ProductDetails = () => {
  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      
      <DetailContextProvider>
        <Details />
      </DetailContextProvider>

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
};

export default ProductDetails;
