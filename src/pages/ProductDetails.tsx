import { DetailContextProvider } from "../components/ProductDetails/Context/DetailsContext";
import { Details, Footer, Header } from "../components";

const ProductDetails = () => {
  return (
    <>
      <Header />

      <DetailContextProvider>
        <Details />
      </DetailContextProvider>

      <Footer />
    </>
  );
};

export default ProductDetails;
