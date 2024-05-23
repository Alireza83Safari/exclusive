import { Footer, Header } from "../../components";
import { ShopLayoutProps } from "./Shop.interface";

const ShopLayout = ({ children }: ShopLayoutProps) => {
  return (
    <>
      <Header />
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative">
        {children}
      </section>
      <Footer />
    </>
  );
};

export default ShopLayout;
