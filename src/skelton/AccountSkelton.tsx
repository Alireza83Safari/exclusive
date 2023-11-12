import ContentLoaders from "../components/ContentLoaders";

function AccountSkelton() {
  return (
    <div className="grid grid-cols-4 gap-y-5 mb-5 border-b border-borderColor">
      <div className="mb-4">
        <ContentLoaders width={150} height={30} />
      </div>
      <div className="mb-4">
        <ContentLoaders width={150} height={30} />
      </div>
      <div className="mb-4">
        <ContentLoaders width={150} height={30} />
      </div>
      <div className="mb-4">
        <ContentLoaders width={150} height={30} />
      </div>

      <div className="mb-4">
        <ContentLoaders width={150} height={30} />
      </div>
      <div className="mb-4">
        <ContentLoaders width={150} height={30} />
      </div>
    </div>
  );
}

export default AccountSkelton;
