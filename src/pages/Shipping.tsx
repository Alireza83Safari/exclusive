import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import {
  useCreateOrderMutation,
  useGetOrderUserQuery,
} from "../Redux/apis/orderApi";
import {
  useCreateAddressMutation,
  useGetAddressesQuery,
} from "../Redux/apis/addressApi";
import { addressType } from "../types/Address.type";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner/Spinner";
import { addressErrorType } from "../types/Error.type";
import { useNavigate } from "react-router-dom";

const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Shipping() {
  const [copunValue, setCopunValue] = useState<string>("");
  const [chooseAddress, setChooseAddress] = useState<string>("");
  const [newAddress, setNewAddress] = useState<addressType>({
    address: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    plaque: null,
    postalCode: "",
  });

  const { data: order } = useGetOrderUserQuery("");
  const { data: addresses } = useGetAddressesQuery("");
  const [createOrder, { isSuccess }] = useCreateOrderMutation();

  const [createAddress, { error: createAddressError }] =
    useCreateAddressMutation();
  const navigate = useNavigate();

  // check if inputs havent value get disabled button
  const btnDisabled = useMemo(() => {
    const newAddresValue = Object.values(newAddress);
    return newAddresValue.some((item) => item.length < 4);
  }, [newAddress]);

  const addNewAddress = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    createAddress(newAddress);
  };

  const setAddreInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name == "plaque") {
      setNewAddress({ ...newAddress, [name]: Number(value) });
    } else {
      setNewAddress({ ...newAddress, [name]: value });
    }
  };

  /*   const addCopounHandler = () => {
    dispatch(codeDiscountValidate(copunValue));
  }; */
  const addOrderHandler = () => {
    if (!chooseAddress) {
      toast.error("please choose address");
    } else {
      createOrder(chooseAddress);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("add order is success");
      navigate("/");
    }
  }, [isSuccess]);

  const addAddressError = createAddressError?.data as addressErrorType;
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto my-10 relative sm:px-5 px-2">
        <div className="grid md:grid-cols-2 md:mt-20 mt-10">
          <div>
            {addresses?.length ? (
              addresses?.map((address) => (
                <div
                  className={`grid grid-cols-2 mb-5 border border-borderColor p-3 rounded-md hover:bg-gray duration-300 sm:text-base text-sm ${
                    address.id === chooseAddress && `bg-gray`
                  }`}
                  key={address.id}
                  onClick={() => setChooseAddress(address.id)}
                >
                  {Object.entries(address).map(
                    ([key, value], innerIndex, array) =>
                      key !== "id" &&
                      key !== "createdAt" &&
                      key !== "updatedAt" && (
                        <React.Fragment key={key}>
                          <div
                            className={
                              innerIndex === array.length - 1
                                ? ""
                                : "border-b border-gray py-4"
                            }
                          >
                            {key}
                          </div>
                          <div
                            className={
                              innerIndex === array.length - 1
                                ? ""
                                : "border-b border-gray py-4"
                            }
                          >
                            {value}
                          </div>
                        </React.Fragment>
                      )
                  )}
                </div>
              ))
            ) : (
              <form className="lg:pr-28 md:pr-8">
                <h1 className="text-4xl">Billing Details</h1>
                <div className="mt-5">
                  <label htmlFor="" className="text-[#999999]">
                    First Name<span className="text-red text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray w-full p-2 mt-2 outline-none"
                    name="firstName"
                    value={newAddress?.firstName}
                    onChange={setAddreInputValue}
                  />
                  <p className="text-red text-xs">
                    {addAddressError?.errors?.firstName}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-[#999999]">
                    Last Name <span className="text-red text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray w-full p-2 mt-2 outline-none"
                    name="lastName"
                    value={newAddress?.lastName}
                    onChange={setAddreInputValue}
                  />
                  <p className="text-red text-xs">
                    {addAddressError?.errors?.lastName}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-[#999999]">
                    National Code<span className="text-red text-lg">*</span>
                  </label>
                  <input
                    type="number"
                    className="bg-gray w-full p-2 mt-2 outline-none"
                    name="nationalCode"
                    value={newAddress?.nationalCode}
                    onChange={setAddreInputValue}
                  />
                  <p className="text-red text-xs">
                    {addAddressError?.errors?.nationalCode}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-[#999999]">
                    Phone Number<span className="text-red text-lg">*</span>
                  </label>
                  <input
                    type="number"
                    className="bg-gray w-full p-2 mt-2 outline-none"
                    name="phoneNumber"
                    value={newAddress?.phoneNumber}
                    onChange={setAddreInputValue}
                  />
                  <p className="text-red text-xs">
                    {addAddressError?.errors?.phoneNumber}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-[#999999]">
                    plaque<span className="text-red text-lg">*</span>
                  </label>
                  <input
                    type="number"
                    className="bg-gray w-full p-2 mt-2 outline-none"
                    name="plaque"
                    value={newAddress?.plaque}
                    onChange={setAddreInputValue}
                  />
                  <p className="text-red text-xs">
                    {addAddressError?.errors?.plaque}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-[#999999]">
                    Postal Code<span className="text-red text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray w-full p-2 mt-2 outline-none"
                    name="postalCode"
                    value={newAddress?.postalCode}
                    onChange={setAddreInputValue}
                  />
                  <p className="text-red text-xs">
                    {addAddressError?.errors?.postalCode}
                  </p>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-[#999999]">
                    Address<span className="text-red text-lg">*</span>
                  </label>
                  <textarea
                    name="address"
                    rows="4"
                    className="bg-gray w-full p-2 mt-2 outline-none"
                    value={newAddress?.address}
                    onChange={setAddreInputValue}
                  ></textarea>
                  <p className="text-red text-xs">
                    {addAddressError?.errors?.address}
                  </p>
                </div>
                <div className="flex mt-5">
                  <input type="checkbox" className="checked:text-red mr-2" />
                  <p>Save this information for faster check-out next time</p>
                </div>
                <button
                  className=" bg-red py-2 px-10 text-white mt-4 disabled:bg-gray disabled:text-red"
                  disabled={btnDisabled}
                  onClick={addNewAddress}
                >
                  Add Address
                </button>
              </form>
            )}
          </div>
          <div className="lg:pl-28 md:pl-8 md:mt-0 mt-10">
            {order?.items.map((order) => (
              <div className="flex items-center justify-between my-7">
                <div className="flex items-center">
                  <img
                    src={`http://127.0.0.1:6060/${order.fileUrl}`}
                    className="w-10 mr-4"
                  />
                  <p>{order.productName}</p>
                </div>
                <p>${order.price}</p>
              </div>
            ))}

            <div className="flex justify-between py-4 border-b border-borderColor">
              <p>Subtotal:</p>
              <p>${order?.price}</p>
            </div>
            <div className="flex justify-between py-4 border-b border-borderColor">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between py-4">
              <p>Total:</p>
              <p>${order?.price}</p>
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="flex">
                <input
                  type="radio"
                  name="Bank"
                  id="yourRadioId"
                  className="mr-3"
                  checked
                />

                <p>Bank</p>
              </div>
              <img src="/images/bank.png" className="h-8" />
            </div>
            <div className="flex mt-5">
              <input type="radio" name="Bank" className="mr-3" />
              <p>Cash on delivery</p>
            </div>

            <div className="w-full grid grid-cols-12 mt-8">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border md:py-3 py-2 col-span-8 pl-4 outline-none"
                onChange={(e) => setCopunValue(e.target.value)}
              />
              <button
                className="bg-red text-white md:py-3 py-2 col-span-4 ml-4 md:text-base text-sm"
                onClick={addCopounHandler}
              >
                Apply Coupon
              </button>
            </div>
            <button
              className="bg-red text-white md:py-3 py-2 px-5 mt-5 md:text-base text-sm disabled:bg-gray disabled:text-red"
              onClick={addOrderHandler}
              disabled={order?.items.length < 1}
            >
              Place Order
            </button>
          </div>
        </div>
      </section>

      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Shipping;
