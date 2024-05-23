import { DetailContextProvider } from "../../context/productDetailsContext";
import { Details } from "../../components";
import { ShopLayout } from "../../layout";

const ProductDetails = () => {
  return (
    <ShopLayout>
      <DetailContextProvider>
        <Details />
      </DetailContextProvider>
    </ShopLayout>
  );
};

export default ProductDetails;
