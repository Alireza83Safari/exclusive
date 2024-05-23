import { ContentLoaders } from "../../components";

function OrderInfosSkeleton() {
  return <ContentLoaders width="32vw" height={200} />;
}

function OrderTableSkeleton() {
  return <ContentLoaders width="98vw" height={500} />;
}

function OrderSkelton() {
  return (
    <div className="grid grid-cols-12 mt-4">
      <div className="grid md:grid-cols-3">
        <OrderInfosSkeleton />
        <OrderInfosSkeleton />
        <OrderInfosSkeleton />
      </div>
      <OrderTableSkeleton />
    </div>
  );
}

export { OrderInfosSkeleton, OrderTableSkeleton, OrderSkelton };
