import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../Redux/Store";
import { getProfileOrders } from "../../Redux/Store/profile";

function AccountOrders() {
  const dispatch = useDispatch();
  const [dataFatch, setDataFatch] = useState<boolean>(false);
  const { profileOrders } = useSelector((state: rootState) => state.profile);
  useEffect(() => {
    if (dataFatch) {
      dispatch(getProfileOrders() as any);
      setDataFatch(true);
    }
  }, [dataFatch]);

  return (
    <div>
      {profileOrders.map((order) => (
        <div key={order.id} className="bg-gray p-6 my-5 rounded-md">
          <div className="border-b border-borderColor pb-5 flex justify-between">
            <p>#{order.code}</p>
            <p>{order.createdAt.slice(0, 10)}</p>
            <p>${order.price}</p>
            <p>
              {order.status === 1 ? (
                <button className="bg-lime-400 text-lime-900 px-3 py-1 text-sm rounded-md">
                  Received
                </button>
              ) : (
                <button>Cancel</button>
              )}
            </p>
          </div>
          <div className="flex pt-5">
            {order.fileUrls.map((url) => (
              <div key={url}>
                <img
                  src={`http://127.0.0.1:6060/${url}`}
                  className="w-12 h-12 mx-2 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AccountOrders;
