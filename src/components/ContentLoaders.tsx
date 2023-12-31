import ContentLoader from "react-content-loader";

type ContextLoaderProps = {
  width: number |string;
  height: number | string;
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
      <rect x="0" y="0" rx="6" ry="6" width="100%" height="100%" />
    </ContentLoader>
  );
}

export default ContentLoaders;
