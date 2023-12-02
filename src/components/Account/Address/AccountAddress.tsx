import React, { useEffect, useState } from "react";
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
} from "../../../Redux/apis/user/addressUserApi";
import AccountSkelton from "../../../skelton/AccountSkelton";
import AddAddress from "./AddAddress";
import { FaTrashAlt } from "react-icons/fa";
import EditAddress from "./EditAddress";

function AccountAddress() {
  const [editId, setEditId] = useState<string>();
  const [showEditModal, setShowEditModal] = useState(false);
  const { data: addresses, isLoading, refetch } = useGetAddressesQuery("");
  const totalSkeletonShow = Array.from(Array(5).keys());
  const [showCreateAddress, setShowCreateAddress] = useState(false);
  const [deleteAddress, { isSuccess }] = useDeleteAddressMutation();

  const deleteAddressHandler = (id: string) => {
    deleteAddress(id);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <>
      <div className="container mx-auto rounded-md">
        <button
          className="bg-black text-white py-2 md:px-3 px-2 rounded-lg mb-3 md:text-base text-sm"
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
                className={`py-8 px-6 relative grid grid-cols-12 gap-y-5 ${
                  index !== addresses?.length - 1
                    ? "border-b border-borderColor"
                    : ""
                }`}
                key={address?.id}
                onClick={() => {
                  setEditId(address.id);
                  setShowEditModal(true);
                }}
              >
                <button
                  className=" absolute top-2 right-2"
                  onClick={() => deleteAddressHandler(address.id)}
                >
                  <FaTrashAlt className="text-lg text-red" />
                </button>
                <AddressDetail label="First Name" value={address.firstName} />
                <AddressDetail label="Last Name" value={address.lastName} />
                <AddressDetail label="Plaque" value={address.plaque} />
                <AddressDetail
                  label="Phone"
                  value={address.phoneNumber}
                />
                <AddressDetail label="Postal Code" value={address.postalCode} />
                <div className="flex items-center col-span-12">
                  <p className="mr-3 text-sm">Address:</p>
                  <p className="font-semibold">{address.address}</p>
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

      {showEditModal && (
        <EditAddress editId={editId} setShowEditModal={setShowEditModal} />
      )}
    </>
  );
}

export default AccountAddress;

const AddressDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex text-sm items-center md:col-span-4 col-span-6">
    <p className="md:mr-3 mr-1">{label}:</p>
    <p className="font-semibold">{value}</p>
  </div>
);
