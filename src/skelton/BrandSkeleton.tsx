import React from "react";
import ContentLoaders from "../components/ContentLoaders";

function BrandSkeleton() {
  return (
    <div>
      <ContentLoaders width={200} height={200} />
    </div>
  );
}

export default BrandSkeleton;
