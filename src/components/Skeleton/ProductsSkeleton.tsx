import ProductSkeleton from "./ProductSkeleton";

const ProductsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductsSkeleton;
