import {
  Arrival,
  Brand,
  Options,
  ProductSlider,
  Suggestion,
  Banner,
} from "../../components";
import { ShopLayout } from "../../layout";
import { useGetProductsUserQuery } from "../../Redux/apis/user/productUserApi";

function Home() {
  const { data: discount, isLoading: discountLoading } =
    useGetProductsUserQuery("?onlyDiscount=true");

  const { data: bestSale, isLoading: bestSaleLoading } =
    useGetProductsUserQuery("?order=topSell");

  const { data: expensive, isLoading: expensiveLoading } =
    useGetProductsUserQuery("?page=1&limit=12&order=expensive");

  const { data: newProducts, isLoading: newProductsLoading } =
    useGetProductsUserQuery("?page=1&limit=12&order=expensive");
  return (
    <ShopLayout>
      <Banner />
      {/* for discount */}
      <ProductSlider
        data={discount?.data}
        isLoading={discountLoading}
        title="Best Have Discount"
        href={"/products?product&onlyDiscount=true"}
      />
      <Brand />
      {/* for expensive */}
      <ProductSlider
        data={expensive?.data}
        isLoading={expensiveLoading}
        title="Expensive Products"
        href={"/products?product&order=expensive"}
      />
      {/* for best sale */}
      <ProductSlider
        data={bestSale?.data}
        isLoading={bestSaleLoading}
        title="Best Selling Products"
        href={"/products?product&order=topSell"}
      />

      <Suggestion />
      {/* for new */}
      <ProductSlider
        data={newProducts?.data}
        isLoading={newProductsLoading}
        title="New Products"
        href={"/products?product&order=newest"}
      />
      <Arrival />
      <Options />
    </ShopLayout>
  );
}

export default Home;
