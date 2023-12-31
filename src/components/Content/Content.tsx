import Menu from "./Menu";
import Banner from "./Banner";

function Content() {
  return (
    <div className="xl:max-w-[1280px] md:max-w-[98%] min-h-[18rem] w-full m-auto grid grid-cols-12 relative">
      <Menu />
      <Banner />
    </div>
  );
}

export default Content;
