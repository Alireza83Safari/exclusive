import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../Redux/Store/address";
import { rootState } from "../../Redux/Store";

function AccountAddress() {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state: rootState) => state.address);
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    if (!fetchData) {
      dispatch(getAddresses() as any);
      setFetchData(true);
    }
  }, [fetchData]);

  return (
    <div className="container mx-auto border border-borderColor rounded-md">
      {addresses.length
        ? addresses.map((address, index) => (
            <div
              className={`py-8 px-6 ${
                index !== addresses.length - 1
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
        : null}
    </div>
  );
}

export default AccountAddress;
