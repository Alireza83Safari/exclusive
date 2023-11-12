import ContentLoaders from "../components/ContentLoaders";

function ProductSkelton() {
  return (
    <div className="relative group my-4 px-2">
      <div className="flex justify-center items-center sm:h-[250px] h-[220px] bg-gray relative"></div>
      <div className="mt-2">
        <ContentLoaders width={100} height={20} />

        <div className="my-1">
          <ContentLoaders width={100} height={20} />
        </div>

        <div className="my-1">
          <ContentLoaders width={200} height={40} />
        </div>
      </div>
    </div>
  );
}

export default ProductSkelton;
