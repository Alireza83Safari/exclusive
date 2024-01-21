import {
  Arrival,
  Brand,
  Footer,
  Header,
  Options,
  ProductSlider,
  Suggestion,
} from "../components";
import { useGetProductsUserQuery } from "../Redux/apis/user/productApiUser";
import Content from "../components/Content/Content";

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
    <div className="min-h-screen">
      <Header />
      <Content />
      {/* for discount */}
      <ProductSlider
        data={discount?.data}
        isLoading={discountLoading}
        title="Best Have Discount"
        buttonText="View All Products Have Discount"
        href={"/products?product&onlyDiscount=true"}
      />
      <Brand />
      {/* for expensive */}
      <ProductSlider
        data={expensive?.data}
        isLoading={expensiveLoading}
        title="Expensive Products"
        buttonText="View All Expensive Products"
        href={"/products?product&order=expensive"}
      />
      {/* for best sale */}
      <ProductSlider
        data={bestSale?.data}
        isLoading={bestSaleLoading}
        title="Best Selling Products"
        buttonText="View All Products Best Sale"
        href={"/products?product&order=topSell"}
      />

      <Suggestion />
      {/* for new */}
      <ProductSlider
        data={newProducts?.data}
        isLoading={newProductsLoading}
        title="New Products"
        buttonText="View All New Products"
        href={"/products?product&order=newest"}
      />
      <Arrival />
      <Options />
      <Footer />
    </div>
  );
}

export default Home;
