import { useContext } from "react";
import Comment from "../../pages/Comment";
import ProductDetailsSkelton from "../../skelton/ProductDetailsSkelton";
import DetailsInfo from "./DetailsInfo";
import RelatedProducts from "./RelatedProducts";
import DetailsImage from "./DetailsImage";
import { DetailContext, DetailContextType } from "./Context/DetailsContext";

function Details() {
  const { productItemLoading, productLoading, productItem, products } =
    useContext(DetailContext) as DetailContextType;
    
  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative my-10 grid grid-cols-10">
      {productItemLoading || productLoading ? (
        <ProductDetailsSkelton />
      ) : productItem ? (
        <>
          <div className="lg:col-span-5 col-span-10">
            <DetailsImage />
          </div>
          <div className="lg:col-span-5 col-span-10 sm:px-5 px-2 lg:py-0 py-7">
            <DetailsInfo />
          </div>
          <Comment />
          <RelatedProducts products={products} />
        </>
      ) : (
        <div className="text-4xl flex justify-center items-center col-span-10 font-semibold">
          product not found!
        </div>
      )}
    </section>
  );
}

export default Details;
