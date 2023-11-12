import ContentLoaders from "../components/ContentLoaders";

function ProductDetailsSkelton() {
  return (
    <div className="grid grid-cols-2 min-w-screen">
      <div>
        <ContentLoaders width={500} height={500} />
      </div>
      <div>
        <ContentLoaders width={40} height={40} />
        <ContentLoaders width={40} height={40} />
        <ContentLoaders width={40} height={40} />
      </div>
    </div>
  );
}

export default ProductDetailsSkelton;
