import ContentLoaders from "../components/ContentLoaders";

function MenuSkelton() {
  return (
    <>
      <div className="my-4">
        <ContentLoaders width={140} height={40} />
      </div>
      <div className="my-4">
        <ContentLoaders width={140} height={40} />
      </div>
      <div className="my-4">
        <ContentLoaders width={140} height={40} />
      </div>
      <div className="my-4">
        <ContentLoaders width={140} height={40} />
      </div>
      <div className="my-4">
        <ContentLoaders width={140} height={40} />
      </div>
    </>
  );
}

export default MenuSkelton;
