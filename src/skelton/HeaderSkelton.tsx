import ContentLoaders from "../components/ContentLoaders";

function HeaderSkelton() {
  return (
    <div className="flex justify-between w-full">
      <ContentLoaders width={200} height={40} />

      <ContentLoaders width={330} height={40} />

      <ContentLoaders width={400} height={40} />
    </div>
  );
}

export default HeaderSkelton;
