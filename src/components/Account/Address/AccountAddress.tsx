import React, { useState } from "react";
import { useGetAddressesQuery } from "../../../Redux/apis/user/addressUserApi";
import AccountSkelton from "../../../skelton/AccountSkelton";
import AddAddress from "./AddAddress";

function AccountAddress() {
  const { data: addresses, isLoading } = useGetAddressesQuery("");
  const totalSkeletonShow = Array.from(Array(5).keys());
  const [showCreateAddress, setShowCreateAddress] = useState(false);
  return (
    <div className="container mx-auto rounded-md">
      <button
        className="bg-black text-white py-2 px-3 rounded-lg mb-3"
        onClick={() => setShowCreateAddress(true)}
      >
        Create new address
      </button>
      <div className="border border-borderColor">
        {isLoading ? (
          totalSkeletonShow?.map((index) => (
            <React.Fragment key={index}>
              <AccountSkelton />
            </React.Fragment>
          ))
        ) : addresses?.length ? (
          addresses?.map((address: any, index: number) => (
            <div
              className={`py-8 px-6 ${
                index !== addresses?.length - 1
                  ? "border-b border-borderColor"
                  : ""
              }`}
              key={index}
            >
              <div className="grid grid-cols-4 gap-y-5">
                <div className="flex items-center">
                  <p className="mr-3 text-sm">FirstName:</p>
                  <p className="font-semibold">{address.firstName}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-3 text-sm">LastName:</p>
                  <p className="font-semibold">{address.lastName}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-3 text-sm">Plaque:</p>
                  <p className="font-semibold">{address.plaque}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-3 text-sm">PhoneNumber:</p>
                  <p className="font-semibold">{address.phoneNumber}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-3 text-sm">Postal Code:</p>
                  <p className="font-semibold">{address.postalCode}</p>
                </div>
                <div className="flex items-center col-span-3">
                  <p className="mr-3 text-sm">Address:</p>
                  <p className="font-semibold">{address.address}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className=" flex justify-center items-center min-h-full w-full">
            <h1 className="text-2xl font-bold py-40 flex justify-center items-center ">
              You Havent Address
            </h1>
          </div>
        )}

        <AddAddress
          showCreateAddress={showCreateAddress}
          setShowCreateAddress={setShowCreateAddress}
        />
      </div>
    </div>
  );
}

export default AccountAddress;
