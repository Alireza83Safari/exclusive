import ContentLoaders from "../components/ContentLoaders";

const CartSkeleton = () => {
  return (
    <div className="my-4">
      <ContentLoaders width="90vw" height={50} />
    </div>
  );
};

export default CartSkeleton;
