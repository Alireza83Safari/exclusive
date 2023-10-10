import React from "react";
import ContentLoader from "react-content-loader";

type ContextLoaderProps = {
  width: number;
  height: number;
};
function ContentLoaders({ width, height }: ContextLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="6" ry="6" width="300" height="40" />
    </ContentLoader>
  );
}

export default ContentLoaders;
