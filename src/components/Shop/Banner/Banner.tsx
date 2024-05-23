import { appPicUserApi } from "../../../Redux";
import { categoryUserApi } from "../../../Redux/apis/user/categoryUserApi";
import { BannerMenuSkeleton } from "../..";
import Content from "./Content";
import Menu from "./Menu";

const Banner = () => {
  const { data: category, isLoading } =
    categoryUserApi.useGetCategorySelectListQuery("");

  const { data, isLoading: isLoadingAppPic } =
    appPicUserApi.useGetAppPicsUserQuery("");

  return (
    <div className="grid grid-cols-12 lg:h-[344px] sm:h-[500px] h-[620px]">
      <div className="lg:col-span-2 col-span-12 lg:order-1 order-2 lg:border-r border-borderColor lg:text-start text-center lg:flex lg:pl-6">
        {isLoading ? <BannerMenuSkeleton /> : <Menu category={category} />}
      </div>
      <div className="lg:col-span-10 col-span-12 lg:order-1 order-1 lg:h-auto">
        <Content data={data} isLoading={isLoadingAppPic} />
      </div>
    </div>
  );
};

export default Banner;
