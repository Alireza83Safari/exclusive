import { ContentLoaders } from "../../components";

function TotalColorSkeleton() {
  return <ContentLoaders width="30vw" height={200} />;
}

function CreateColorSkeleton() {
  return <ContentLoaders width="30vw" height={430} />;
}

function ColorSkeleton() {
  return (
    <div className="grid grid-cols-12 mt-4">
      <ContentLoaders width="65vw" height={630} />;
      <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
        <div className="lg:col-span-2 cols-span-1">
          <TotalColorSkeleton />
        </div>
        <div className="lg:col-span-2 cols-span-1">
          <CreateColorSkeleton />
        </div>
      </div>
    </div>
  );
}

export { TotalColorSkeleton, CreateColorSkeleton, ColorSkeleton };
