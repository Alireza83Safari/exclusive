import { ContentLoaders } from "../../components";

function TopbarSkelton() {
  return (
    <div className="grid grid-cols-3 min-w-screen col-span-3">
      <ContentLoaders width="30vw" height={200} />
      <ContentLoaders width="30vw" height={200} />
      <ContentLoaders width="30vw" height={200} />
    </div>
  );
}

function ChartSkelton() {
  return <ContentLoaders width="62vw" height={400} />;
}

function DashboardSkeleton() {
  return (
    <section className="pb-8">
      <div className="grid sm:grid-cols-3 gap-7 py-3 md:mx-7 mx-3 rounded-xl mt-4 md:ml-7 ml-3 relative">
        <TopbarSkelton />
      </div>

      <div className="grid grid-cols-12">
        <div className="grid grid-rows-2 md:col-span-8 col-span-12">
          <ChartSkelton />

          <OrdersSkeleton />
        </div>
        <div className="grid grid-rows-2 md:col-span-4 col-span-12 relative">
          <MostSkeleton />
          <MostSkeleton />
        </div>
      </div>
    </section>
  );
}

function MostSkeleton() {
  return <ContentLoaders width="30vw" height={400} />;
}

function OrdersSkeleton() {
  return <ContentLoaders width="30vw" height={400} />;
}

export { TopbarSkelton, ChartSkelton, DashboardSkeleton, MostSkeleton };
